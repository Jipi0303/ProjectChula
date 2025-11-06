# Configuración de Variables en Netlify - Guía Visual Paso a Paso

## El Problema

Tu `.env` local tiene las variables, pero **Netlify NO LAS TIENE**. Por eso falla en producción.

**Solución:** Copiar las mismas variables a Netlify.

---

## Paso 1: Obtener las Credenciales

### Abre Supabase Dashboard

Ve a: https://app.supabase.com

Busca tu proyecto y selecciónalo.

### Navega a Settings → API

1. En la barra izquierda, ve al final y haz clic en **"Settings"**
2. En el menú que se abre, selecciona **"API"**

### Copia estos DOS valores:

```
┌─────────────────────────────────────────────┐
│ Project URL                                 │
│ https://xfsvlutfywhpzjoewuzj.supabase.co  │ ← CÓPIALO
└─────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Anon Public Key                                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M... ← CÓPIALO │
└──────────────────────────────────────────────────────────────┘
```

Guarda ambos en un bloc de notas por ahora.

---

## Paso 2: Ir a Netlify

### Abre tu Sitio en Netlify

Ve a: https://netlify.com

1. Haz login
2. Selecciona tu proyecto "carta-para-ella"

### Navega a Site Settings

En la barra superior, encontrarás estos botones:
```
Deploys | Logs | Analytics | Site Settings
```

**Haz clic en: "Site Settings"**

---

## Paso 3: Agregar Variables de Entorno

### En la barra izquierda, busca "Environment"

Debería estar en la sección **"Build & Deploy"** o directamente como **"Environment"**.

Si ves "Build & Deploy", haz clic ahí y luego verás "Environment variables".

### Haz clic en "Edit variables" o "Add a variable"

---

## Paso 4: Agregar Primera Variable

### PRIMERA VARIABLE:

**Formulario que verás:**

```
┌──────────────────────────────┐
│ Key:   [____________]        │
│ Value: [____________]        │
│                              │
│ [Save] [Cancel]              │
└──────────────────────────────┘
```

### Llena así:

```
Key:   VITE_SUPABASE_URL
Value: https://xfsvlutfywhpzjoewuzj.supabase.co
       (Pega EXACTAMENTE lo que copiaste de Supabase)
```

Haz clic en **Save**

**Resultado esperado:**
```
✓ VITE_SUPABASE_URL = https://xfsvlutfywhpzjoewuzj.supabase.co
```

---

## Paso 5: Agregar Segunda Variable

### SEGUNDA VARIABLE:

Haz clic en **"Add a variable"** nuevamente

```
┌──────────────────────────────┐
│ Key:   [____________]        │
│ Value: [____________]        │
│                              │
│ [Save] [Cancel]              │
└──────────────────────────────┘
```

### Llena así:

```
Key:   VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
       (Pega EXACTAMENTE lo que copiaste de Supabase)
```

Haz clic en **Save**

**Resultado esperado:**
```
✓ VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Paso 6: Verificar que Están Agregadas

En Netlify, en la sección Environment, deberías ver:

```
✓ VITE_SUPABASE_URL = https://xfsvlutfywhpzjoewuzj.supabase.co
✓ VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Si ves esto, pasas al siguiente paso.**

---

## Paso 7: Trigger Redeploy (IMPORTANTE)

### Vuelve a "Deploys"

En la barra superior, ve a **"Deploys"**

### Haz clic en "Trigger deploy"

Verás un menú desplegable, selecciona:
```
Deploy site (Clear cache and rebuild)
```

### Espera a que termine

Verás una línea en progreso:
```
▓▓▓░░░░░░ Building...
```

Cuando termina, verás un checkmark verde ✓

**Tiempo:** 2-5 minutos

---

## Paso 8: Prueba en Producción

### Abre tu Sitio Publicado

Ve a tu URL de Netlify, por ejemplo:
```
https://carta-para-ella-12345.netlify.app
```

### Navega hasta la Carta

1. Espera a que cargue completamente
2. Haz clic en "Abrir carta 💌"
3. Haz clic en "Seguir leyendo →"
4. Haz clic 3 veces en el sobre
5. La carta se abre

### Haz Clic en "Sí"

Deberías ver:

```
Modal de éxito:
┌─────────────────────────────────┐
│    ¡Dijiste que sí! 😎          │
│                                 │
│ 🎉                              │
│                                 │
│ ✓ Notificación enviada a        │
│   tu email                      │
│                                 │
│  [Cerrar]                       │
└─────────────────────────────────┘
```

### Revisa tu Email

En **5-10 segundos** recibirás un email con asunto:
```
"¡Dijiste que Sí! 💌"
```

---

## Si Ves Error "Variables de Entorno de Supabase No Configuradas"

### Culpables Más Comunes:

1. **No copiaste correctamente los valores**
   - Abre Supabase nuevamente
   - Copia cada valor de nuevo
   - Pégalos en Netlify

2. **Escribiste mal el nombre de la variable**
   - Debe ser exacto: `VITE_SUPABASE_URL` (mayúsculas, guión bajo)
   - Debe ser exacto: `VITE_SUPABASE_ANON_KEY` (mayúsculas, guión bajo)

3. **No hiciste redeploy**
   - Ir a Deploys → Trigger deploy → Deploy site
   - Esperar a que termine (checkmark verde)

4. **El redeploy aún está en progreso**
   - En Deploys, espera a ver checkmark ✓
   - Luego abre el sitio (puede cachar una versión vieja, presiona Ctrl+Shift+R)

### Abre Developer Tools para Más Detalles

1. En tu sitio, presiona **F12**
2. Ve a **Console** (pestaña)
3. Haz clic en "Sí"
4. ¿Qué dice el error rojo?

Copia el error completo y búscalo en Google o comparte conmigo.

---

## Checklist Visual

```
Paso 1: Copiar credenciales de Supabase
   ☐ VITE_SUPABASE_URL copiado
   ☐ VITE_SUPABASE_ANON_KEY copiado

Paso 2-3: Ir a Netlify
   ☐ Abierto Netlify
   ☐ Seleccionado proyecto
   ☐ Ido a Site Settings

Paso 4-5: Agregar Variables
   ☐ VITE_SUPABASE_URL agregada
   ☐ VITE_SUPABASE_ANON_KEY agregada
   ☐ Ambas aparecen en Environment

Paso 6-7: Trigger Redeploy
   ☐ Hecho Trigger deploy
   ☐ Esperado a que termine (checkmark verde ✓)
   ☐ El deploy finalizó exitosamente

Paso 8: Prueba
   ☐ Abierto el sitio publicado
   ☐ Navegado hasta la carta
   ☐ Hecho clic en "Sí"
   ☐ Ví el mensaje de éxito
   ☐ Recibí el email ✓
```

---

## Resumen

| Paso | Acción | Tiempo |
|------|--------|--------|
| 1 | Copiar credenciales de Supabase | 1 min |
| 2-3 | Navegar a Netlify Site Settings | 1 min |
| 4-5 | Agregar 2 variables de entorno | 2 min |
| 6-7 | Trigger redeploy | 5 min |
| 8 | Probar en sitio publicado | 2 min |
| **Total** | | **~10 min** |

---

## Después de esto Funcione

Tendrás:

✅ Variables configuradas en Netlify
✅ Redeploy completado
✅ Sitio recibiendo emails cuando hagan clic en "Sí"
✅ Todo el flujo funcionando en producción
✅ Historial de respuestas en Supabase

¡Listo para que Marely reciba la notificación! 💌

---

## Preguntas Frecuentes

**¿Cuánto tarda en aparecer el email?**
5-10 segundos normalmente.

**¿Por qué dice "enviando notificación" al principio?**
Porque está llamando al servidor (Edge Function) para enviar el correo.

**¿Puedo cambiar el email destino después?**
Sí, edita `src/content.json` → `recipientEmail` y haz push a GitHub (Netlify redeploy automático).

**¿Qué pasa si llego a 100 emails/día?**
Resend deja de enviar. Pero para un sitio personal es suficiente.

---

**¡Esto debería funcionar!** 💪
