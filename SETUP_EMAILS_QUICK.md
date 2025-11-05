# Configuración de Emails - Guía Rápida

Sigue estos 5 pasos simples para activar el envío de emails.

---

## Paso 1: Registrarse en Resend (2 minutos)

1. Ve a **[resend.com](https://resend.com)**
2. Haz clic en **"Sign Up"** o **"Get Started"**
3. Completa el registro con tu email
4. Verifica tu email (entra al link del correo de confirmación)

✅ **Resend listo**

---

## Paso 2: Copiar API Key (1 minuto)

1. En Resend, ve a **"API Keys"** (o similar)
2. **Copia** la clave que aparece (empieza con `re_`)
3. Guárdala en un lugar seguro (la necesitarás en el siguiente paso)

✅ **API Key copiada**

---

## Paso 3: Configurar en Supabase (2 minutos)

1. Ve al **Dashboard de Supabase** de tu proyecto
2. Ve a **Settings** → **Edge Functions** (busca "Secrets" o "Environment")
3. Haz clic en **"New Secret"** o **"Add Secret"**
4. Llena los campos:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Pega la API key que copiaste (ej: `re_abc123xyz...`)
5. Haz clic en **"Add"** o **"Create"**

✅ **Supabase configurado**

---

## Paso 4: Editar tu Email (1 minuto)

1. Abre el archivo: `src/content.json`
2. Busca la sección que dice `"carta": {`
3. Dentro de esa sección, busca estas líneas:
   ```json
   "recipientEmail": "tu-email-aqui@gmail.com",
   "senderName": "Tu Nombre"
   ```
4. Reemplaza:
   - `tu-email-aqui@gmail.com` → **TU EMAIL REAL** (ej: `maria@gmail.com`)
   - `Tu Nombre` → **TU NOMBRE** (ej: `Carlos`)
5. **Guarda el archivo**

**Ejemplo final:**
```json
"recipientEmail": "maria@gmail.com",
"senderName": "Carlos"
```

✅ **Email configurado**

---

## Paso 5: Probar (1 minuto)

### Local (desarrollo):

```bash
# 1. Inicia el servidor
npm run dev

# 2. Abre http://localhost:5173 en el navegador

# 3. Navega hasta la carta

# 4. Abre el sobre (3 clics)

# 5. Haz clic en "SÍ"

# 6. Deberías ver: "Enviando notificación..."
# 7. Después: "Notificación enviada a tu email"

# 8. Revisa tu email (puede tardar 5-10 segundos)
```

### En Producción:

1. Deploy en Netlify/Vercel
2. Abre el sitio publicado
3. Sigue los pasos 3-8 de arriba

✅ **¡Listo! Sistema de emails funcionando**

---

## Verification Checklist

- [ ] Resend cuenta creada
- [ ] API key copiada
- [ ] Secret `RESEND_API_KEY` configurado en Supabase
- [ ] `src/content.json` editado con tu email
- [ ] `senderName` establecido con tu nombre
- [ ] Probado localmente y recibiste el email
- [ ] Site desplegado y probado en producción

---

## Qué Sucede Cuando Haces Clic en "Sí"

```
1. Modal de éxito aparece
   ↓
2. Ves: "Enviando notificación..."
   ↓
3. El servidor envía el correo (en background)
   ↓
4. Ves: "Notificación enviada a tu email" ✓
   ↓
5. En 5-10 segundos recibes el email 📧
```

---

## Contenido del Email Recibido

**De:** Carta para Ella <onboarding@resend.dev>
**Asunto:** ¡Dijiste que Sí! 💌

El email incluye:
- Mensaje de celebración
- Tu nombre (si lo proporcionaste)
- Confirmación de que fue aceptada la invitación

---

## Si Algo No Funciona

### No recibo el email

1. **Verifica el email en content.json:**
   - ¿Está escrito correctamente?
   - ¿Tiene @ y dominio valido?

2. **Revisa tu email spam/promociones**
   - A veces llega a Spam

3. **En Resend Dashboard:**
   - Ve a "Activity" o "Emails"
   - ¿Ves el email que intentaste enviar?
   - ¿Tiene error o está "Sent"?

4. **Abre Developer Tools (F12):**
   - Ve a "Console"
   - ¿Hay mensajes de error rojo?
   - Cópialos y búscalos en Google

### Contacta Soporte

- Resend: [support@resend.com](mailto:support@resend.com)
- Supabase: Dashboard → Help → Contact Support

---

## Información Importante

### Límites Gratis
- **100 emails por día** con Resend (plan gratuito)
- Perfecto para sitios personales
- Si necesitas más, puedes pagar en Resend

### Seguridad
- Tu API key está protegida en Supabase (no en el código)
- Los emails se envían desde servidores seguros
- Las respuestas se guardan en tu base de datos

### Privacidad
- Solo el email que tú indiques recibe las notificaciones
- Los datos se guardan en Supabase (tu base de datos privada)

---

## Personalización Avanzada

### Cambiar Plantilla del Email

Edita el archivo: `supabase/functions/send-response-email/index.ts`

Busca la sección `html:` (alrededor de línea 130) y personaliza el HTML.

### Cambiar Dominio del Email

Por defecto envía desde `onboarding@resend.dev`. Para personalizar:

1. En Resend, ve a **Domains**
2. Agrega y verifica tu dominio
3. En `send-response-email/index.ts`, cambia la línea `from:`

### Enviar a Múltiples Emails

Modifica la Edge Function para hacer loop sobre múltiples destinatarios.

---

## Próximos Pasos Opcionales

1. **Ver historial de respuestas** → Consulta tabla `email_responses` en Supabase
2. **Agregar más cartas** → Sigue el patrón de `CartaSection`
3. **Enviar SMS también** → Integra servicio como Twilio
4. **Webhook a Discord** → Recibe notificaciones en servidor de Discord

---

## Resumen

```
✅ Resend registrado y API key lista
✅ Supabase secret configurado
✅ Email y nombre editados en JSON
✅ Sitio testeado localmente
✅ Sistema de emails funcionando
```

**Tiempo total:** ~10 minutos

**Costo:** Gratis (Resend + Supabase plan free)

**Resultado:** Recibes correo al instante cuando alguien dice "Sí" 💌

---

¡Listo! Ahora tu carta especial notificará automáticamente cuando sea aceptada.
