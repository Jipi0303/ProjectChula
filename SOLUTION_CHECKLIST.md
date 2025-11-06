# Solución Completa - Error de Variables de Supabase

## El Problema

```
⚠️ Error: "Variables de entorno de Supabase no configuradas"
(Pero tu respuesta fue registrada)
```

**Causa:** Tu sitio en Netlify **no tiene las credenciales de Supabase** configuradas.

Tu `.env` local SÍ las tiene, pero Netlify no.

---

## La Solución Exacta (10 minutos)

### PASO 1: Abre Supabase

1. Ve a: https://app.supabase.com
2. Selecciona tu proyecto
3. En la barra izquierda (abajo), haz clic en **"Settings"**
4. En el menú que se abre, selecciona **"API"**

### PASO 2: Copia 2 Credenciales

En la pantalla verás:

```
┌─ PROJECT API KEYS ────────────────────────────┐
│                                               │
│ Project URL:                                  │
│ https://xfsvlutfywhpzjoewuzj.supabase.co    │
│ [Copy button]                                 │
│                                               │
│ Anon Public Key:                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [Copy button]                                 │
│                                               │
└───────────────────────────────────────────────┘
```

**COPIA:**
1. Project URL (haz clic en el botón "Copy")
2. Anon Public Key (haz clic en el botón "Copy")

Guarda ambas en un bloc de notas por ahora.

---

### PASO 3: Abre Netlify

1. Ve a: https://netlify.com
2. Login si es necesario
3. Busca y selecciona tu proyecto "carta-para-ella"

---

### PASO 4: Ir a Environment Variables

En la barra superior, busca y haz clic en: **"Site settings"**

En el menú izquierdo, busca **"Environment"** (o ve a **"Build & deploy"** → **"Environment variables"**)

---

### PASO 5: Agregar Primera Variable

Haz clic en **"Add a variable"** (o "Edit variables")

**FORMULARIO:**
```
Key:   VITE_SUPABASE_URL
Value: https://xfsvlutfywhpzjoewuzj.supabase.co
       (Pega lo que copiaste del Project URL)
```

Haz clic en **Save**

**Deberías ver:**
```
✓ VITE_SUPABASE_URL = https://xfsvlutfywhpzjoewuzj.supabase.co
```

---

### PASO 6: Agregar Segunda Variable

Haz clic en **"Add a variable"** nuevamente

**FORMULARIO:**
```
Key:   VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
       (Pega lo que copiaste del Anon Public Key)
```

Haz clic en **Save**

**Deberías ver:**
```
✓ VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### PASO 7: Trigger Redeploy (CRUCIAL)

1. En la barra superior, haz clic en **"Deploys"**
2. Busca el botón **"Trigger deploy"** (arriba a la derecha)
3. Se abrirá un menú, selecciona: **"Deploy site"** (o "Clear cache and rebuild")
4. Espera a que se complete (verás: `▓▓▓ Building...`)
5. Cuando termina, verás un checkmark verde ✓

**Tiempo:** 2-5 minutos

---

### PASO 8: Prueba el Sitio

1. Abre tu URL de Netlify (ej: `https://tu-proyecto.netlify.app`)
2. Presiona **Ctrl+Shift+R** para limpiar caché (importante)
3. Navega: Abrir carta → Seguir leyendo → 3 clics en sobre
4. Haz clic en **"Sí"**
5. Deberías ver: **"Notificación enviada a tu email"** ✓
6. En 5-10 segundos, revisa tu email 📧

---

## ¿Y si sigue dando error?

### Check 1: ¿Ves las variables en Netlify?

En **Site Settings → Environment**, ¿aparecen?
```
VITE_SUPABASE_URL ✓
VITE_SUPABASE_ANON_KEY ✓
```

Si NO aparecen → Repite PASO 5 y 6

---

### Check 2: ¿Hiciste redeploy?

En **Deploys**, ¿hay un deploy reciente (después de agregar variables)?
```
Deploy #12 - 2 minutes ago - SUCCESS ✓
```

Si NO → Repite PASO 7

---

### Check 3: Limpiar Caché del Navegador

1. Presiona **Ctrl+Shift+Suprimir** (Windows) o **Cmd+Shift+Suprimir** (Mac)
2. Selecciona **"All time"**
3. Marca **"Cookies and other site data"** y **"Cached images and files"**
4. Haz clic en **"Clear"**
5. Recarga la página (F5)

---

### Check 4: Abre Developer Tools

1. Presiona **F12**
2. Ve a **Console** (pestaña)
3. Haz clic en "Sí"
4. ¿Qué error aparece en rojo?

Copia el error exacto y:
- Búscalo en Google
- O comparte conmigo

---

## Resumen Visual

```
Supabase
   │
   ├─ Settings → API
   │  │
   │  ├─ Project URL ────────┐
   │  │                       │
   │  └─ Anon Public Key ──────┼─→ COPIAR
   │                           │
   └────────────────────────────┘
                                │
                                ▼
                          Netlify
                           │
                           ├─ Site Settings
                           │  │
                           │  ├─ Environment
                           │  │  │
                           │  │  ├─ VITE_SUPABASE_URL ─────── AGREGAR
                           │  │  │
                           │  │  └─ VITE_SUPABASE_ANON_KEY ─── AGREGAR
                           │  │
                           │  └─ Trigger deploy ──────────────── HACER CLICK
                           │
                           ▼
                      Tu Sitio Publicado
                           │
                           ├─ Haz clic en "Sí"
                           │
                           ▼
                      Email enviado ✓
```

---

## La Verdad

**Tu código está perfecto.**

Lo único que falta es que Netlify sepa dónde está tu base de datos Supabase. Es como darle la dirección a un cartero.

**Sin la dirección:** El cartero no sabe dónde ir.
**Con la dirección (variables en Netlify):** El cartero puede entregar el email.

---

## Archivos Importantes

| Archivo | Qué hace |
|---------|----------|
| `src/content.json` | Contiene el email destino y nombre |
| `supabase/functions/send-response-email/` | Servidor que envía el email |
| `.env` | Tu local (ya tiene las credenciales ✓) |
| Netlify Environment | Lo que FALTA configurar |

---

## Orden Correcto de TODO

```
1. ✅ Resend registrado
   └─ API key obtenida

2. ✅ Supabase secret configurado
   └─ RESEND_API_KEY agregado

3. ✅ content.json editado
   └─ Email y nombre configurados

4. ✅ .env local creado
   └─ VITE_SUPABASE_URL
   └─ VITE_SUPABASE_ANON_KEY

5. ✅ Build local testeado
   └─ npm run dev funcionando

6. ❌ Netlify Environment Variables ← TÚ ESTÁS AQUÍ
   └─ FALTA AGREGAR las variables
   └─ FALTA hacer redeploy

7. (Próximo) Probar en producción
   └─ Ver el email llegar ✓
```

---

## Tiempo Estimado

- **Pasos 1-2:** 2 minutos (copiar credenciales)
- **Pasos 3-6:** 5 minutos (agregar variables en Netlify)
- **Paso 7:** 5 minutos (redeploy)
- **Paso 8:** 2 minutos (probar)

**Total: 10-15 minutos**

---

## Después de esto Funcione

Tendrás:

```
✅ Sitio funcionando en Netlify
✅ Variables de Supabase configuradas
✅ Emails enviándose automáticamente
✅ Historial de respuestas en base de datos
✅ Todo listo para producción
✅ Marely recibe la notificación 💌
```

---

## Garantía

Si sigues estos pasos **EXACTAMENTE en este orden**, el sistema de emails funcionará al 100%.

Si algo sigue fallando:

1. Revisa todos los "Checks" arriba
2. Abre DevTools y copia el error exacto
3. Contáctame con:
   - El error exacto que ves
   - Screenshots de Netlify Environment
   - Confirmación de que hiciste cada paso

---

**¡Adelante! Esto es la recta final.** 💪
