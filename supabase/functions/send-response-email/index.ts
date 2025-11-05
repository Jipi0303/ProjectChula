import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@3.0.0";

// Configurar CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Interfaz para la solicitud del cliente
interface SendEmailRequest {
  recipientEmail: string;
  senderName?: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Manejar preflight requests (OPTIONS)
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Solo aceptar POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método no permitido" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parsear el body de la solicitud
    const { recipientEmail, senderName } = (await req.json()) as SendEmailRequest;

    // Validar que el email sea válido
    if (!recipientEmail || !recipientEmail.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Email inválido" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Obtener variables de entorno
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Validar que las variables de entorno estén configuradas
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY no está configurada");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Variables de Supabase no configuradas");
    }

    // Inicializar cliente de Supabase con service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Inicializar cliente de Resend para enviar emails
    const resend = new Resend(resendApiKey);

    // Enviar el correo usando Resend
    const emailResponse = await resend.emails.send({
      from: "Carta para Ella <onboarding@resend.dev>", // Cambia esto por tu dominio verificado
      to: recipientEmail,
      subject: "¡Dijiste que Sí! 💌",
      html: `
        <div style="font-family: 'Raleway', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(to bottom, #F5C7C7, #FFE5E5); border-radius: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #333; margin: 0; font-weight: 600;">¡Dijiste que Sí!</h1>
            <p style="font-size: 48px; margin: 10px 0 0 0;">🎉💕</p>
          </div>
          
          <div style="background: white; border-radius: 15px; padding: 30px; border: 3px solid #D4AF37; text-align: center;">
            <p style="font-size: 18px; color: #666; margin: 0 0 20px 0; line-height: 1.6;">
              Este es un momento especial. Alguien que te aprecia mucho acaba de invitarte a una cita.
            </p>
            
            ${senderName ? `
              <p style="font-size: 16px; color: #999; margin: 20px 0 0 0;">
                <strong>${senderName}</strong> está esperando tu respuesta.
              </p>
            ` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Este es un mensaje automático enviado desde una carta especial creada con cariño.
            </p>
          </div>
        </div>
      `,
    });

    // Verificar si el correo se envió correctamente
    if (emailResponse.error) {
      console.error("Error enviando correo:", emailResponse.error);
      throw new Error(`Error de Resend: ${emailResponse.error.message}`);
    }

    // Registrar la respuesta en Supabase
    const { error: dbError } = await supabase.from("email_responses").insert([
      {
        response: "Sí",
        user_name: senderName || "Anónimo",
        user_email: recipientEmail,
      },
    ]);

    if (dbError) {
      console.error("Error guardando en base de datos:", dbError);
      // No frenamos por este error, el email ya se envió
    }

    // Respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        message: "Correo enviado exitosamente",
        emailId: emailResponse.data?.id,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // Manejo de errores
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("Error en Edge Function:", errorMessage);

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
