# Configuración de Sistema de Emails

Esta guía explica cómo configurar el sistema de envío de correos cuando se hace clic en "Sí" en la carta.

---

## Resumen del Sistema

Cuando la persona hace clic en el botón "Sí":

1. Se muestra un modal de éxito
2. En segundo plano, se envía un correo a tu email
3. El correo incluye notificación de que tu invitación fue aceptada
4. Se registra la respuesta en la base de datos Supabase

---

## Servicios Utilizados

### 1. **Resend** (Servicio de Email)
- **Qué es:** Servicio moderno para enviar emails desde aplicaciones
- **Por qué:** Fácil de usar, gratuito hasta 100 emails/día, perfecto para proyectos personales
- **Alternativas:** SendGrid, Mailgun, AWS SES

### 2. **Supabase Edge Functions** (Servidor)
- **Qué es:** Funciones serverless que se ejecutan en los servidores de Supabase
- **Por qué:** No expone tu API key del cliente, es seguro
- **Ventaja:** Ya está integrado con tu base de datos

### 3. **Supabase Database** (Registro)
- **Qué es:** Base de datos PostgreSQL en la nube
- **Por qué:** Guarda un historial de respuestas
- **Uso:** Puedes ver después cuántas personas dijeron "Sí"

---

## Pasos de Configuración

### Paso 1: Registrarse en Resend

1. Ve a [resend.com](https://resend.com)
2. Haz clic en **"Get Started"** o **"Sign Up"**
3. Completa el registro con tu email
4. Verifica tu email

### Paso 2: Obtener la API Key de Resend

1. Una vez logueado en Resend, ve a **"API Keys"**
2. Copia la API key (empieza con `re_`)
3. Guarda este valor en un lugar seguro

### Paso 3: Configurar la API Key en Supabase

El sistema automáticamente busca la variable `RESEND_API_KEY` en tus secrets de Supabase.

**En el dashboard de Supabase:**

1. Ve a tu proyecto Supabase
2. **Settings** → **Edge Functions** (o **Secrets**)
3. Haz clic en **"New Secret"** o **"Add Secret"**
4. **Name:** `RESEND_API_KEY`
5. **Value:** Pega la API key que copiaste de Resend
6. Haz clic en **"Add"**

**Verificar que está configurada:**
```bash
# En tu terminal, con el proyecto Supabase activo
supabase secrets list
# Deberías ver: RESEND_API_KEY = re_...
```

### Paso 4: Editar tu Email de Destino

**Archivo:** `src/content.json`

Busca la sección `carta` y edita estos valores:

```json
"carta": {
  "message": "...",
  "yesButton": "Sí",
  "noButton": "No",
  "successMessage": "¡Sabía que dirías que sí! 😎",
  "recipientEmail": "tu-email-aqui@gmail.com",  // ← EDITA AQUÍ
  "senderName": "Tu Nombre"                      // ← Y AQUÍ (opcional)
}
```

**Ejemplo:**
```json
"recipientEmail": "marely@gmail.com",
"senderName": "Carlos"
```

### Paso 5: Verificar tu Dominio en Resend (Opcional pero Recomendado)

Por defecto, los emails se envían desde `onboarding@resend.dev`. Para verlos profesionales:

1. En Resend, ve a **"Domains"**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `carta.tunombre.com`)
4. Sigue las instrucciones de verificación DNS
5. Una vez verificado, actualiza el email en la Edge Function:

**En `supabase/functions/send-response-email/index.ts`:**

```typescript
// Línea aproximadamente 130
from: "Carta para Ella <noreply@tu-dominio.com>",  // ← CAMBIA AQUÍ
```

---

## Cómo Funciona Técnicamente

### Flujo del Cliente (React)

```
Usuario hace clic "Sí"
       ↓
Se muestra modal de éxito
       ↓
Se llama a sendYesEmail()
       ↓
Se hace fetch a la Edge Function
       ↓
Se espera respuesta
       ↓
Muestra estado (enviando → éxito/error)
```

### Flujo del Servidor (Edge Function)

```
Recibe request POST
       ↓
Valida el email
       ↓
Obtiene RESEND_API_KEY
       ↓
Envía email a través de Resend
       ↓
Guarda respuesta en Supabase DB
       ↓
Retorna JSON de éxito/error
```

---

## Plantilla del Email

El email que se envía incluye:

```
Asunto: ¡Dijiste que Sí! 💌

Cuerpo (HTML personalizado):
- Mensaje de celebración
- Nombre de quien envía (si se proporciona)
- Nota que fue enviado desde la carta especial
```

Puedes personalizarlo editando el HTML en la Edge Function:

**Archivo:** `supabase/functions/send-response-email/index.ts`

Busca la sección `html:` (alrededor de la línea 130) y edita el contenido.

---

## Pruebas Locales

### Probar en Desarrollo

1. Asegúrate de que `RESEND_API_KEY` está configurada:
   ```bash
   supabase secrets list
   ```

2. Inicia el dev server:
   ```bash
   npm run dev
   ```

3. Abre http://localhost:5173
4. Navega hasta la sección de la carta
5. Haz clic en "Sí"
6. Deberías recibir un email en pocos segundos

**Nota:** En desarrollo local, necesitas estar conectado a Supabase para que funcione.

### Si no Reciben el Email

1. **Verifica el email en el archivo JSON:**
   - `recipientEmail` debe ser válido (ej: usuario@dominio.com)

2. **Revisa el dashboard de Resend:**
   - Ve a [dashboard.resend.com](https://dashboard.resend.com)
   - Ve a **"Activity"** o **"Emails"**
   - Busca tu email y revisa si hay errores

3. **Revisa la consola del navegador (F12):**
   - Abre DevTools
   - Ve a **Console**
   - Busca mensajes de error

4. **Verifica los logs de Supabase:**
   - En el dashboard de Supabase
   - **Edge Functions** → **send-response-email**
   - Revisa los logs de recientes invocaciones

---

## Solución de Problemas

### Error: "RESEND_API_KEY no está configurada"

**Solución:** Asegúrate de agregar la variable secreta en Supabase:
```bash
supabase secrets set RESEND_API_KEY=re_tuapikey
```

### Error: "Email inválido"

**Solución:** Verifica que `recipientEmail` en `content.json` sea válido:
- Debe incluir @
- Debe tener dominio válido (ej: gmail.com)
- No debe tener espacios

### Error: "No se pudo enviar el email"

**Soluciones:**
1. Verifica que Resend tiene créditos disponibles (gratis incluye 100/día)
2. Revisa que el dominio esté verificado en Resend (si usas dominio personalizado)
3. Verifica los logs de Resend en su dashboard

### El email llega pero se ve mal

**Solución:** Edita el HTML en la Edge Function. Aumenta padding, cambia colores, etc.

---

## Limite de Uso

### Plan Gratuito de Resend

- **100 emails por día**
- Sin costo
- Perfecto para sitios personales

Si necesitas más, puedes cambiar a plan de pago directamente en Resend.

---

## Futuras Mejoras

### 1. Agregar Confirmación de Email

```typescript
// En Edge Function
// Después de enviar el email:
const { data, error } = await supabase
  .from('email_responses')
  .insert([{
    email_sent: true,
    email_delivery_id: response.data?.id,
  }]);
```

### 2. Enviar Emails a Múltiples Destinatarios

```typescript
// En CartaSection
const recipientEmails = [
  'email1@ejemplo.com',
  'email2@ejemplo.com',
];

// Luego hacer loop para enviar a cada uno
```

### 3. Agregar Adjuntos o Imágenes

```typescript
// En la Edge Function
{
  attachments: [
    {
      filename: "foto.jpg",
      content: base64_content,
    },
  ],
}
```

---

## Seguridad

### Buenas Prácticas Implementadas

1. **API Key protegida:** Se almacena en Supabase secrets, no en el código
2. **Edge Function:** No expone la API key al cliente
3. **CORS protegido:** Solo acepta solicitudes de tu dominio
4. **RLS en base de datos:** Controla quién puede leer/escribir

### Lo que NO hacer

- ❌ Nunca expongas tu RESEND_API_KEY en el código
- ❌ No la incluyas en .env del navegador
- ❌ No la compartas en repositorios públicos

---

## Contacto y Soporte

Si tienes problemas:

1. Revisa esta guía (especialmente "Solución de Problemas")
2. Consulta documentación de:
   - [Resend Docs](https://resend.com/docs)
   - [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
   - [Supabase Secrets](https://supabase.com/docs/guides/functions/secrets)
3. Revisa los logs en ambas plataformas

---

## Resumen Rápido de Cambios Necesarios

```
1. Registrarse en Resend (resend.com)
2. Copiar RESEND_API_KEY
3. Configurar en Supabase secrets: RESEND_API_KEY
4. Editar content.json:
   - recipientEmail: "tu-email@example.com"
   - senderName: "Tu Nombre"
5. Probar haciendo clic en "Sí"
6. ¡Listo! Recibirás el email en segundos
```

---

El sistema está completamente funcional y listo para usar. Solo necesitas configurar las credenciales de Resend y tu email de destino.
