# FIX: Error "Variables de entorno de Supabase no configuradas"

Este error significa que el frontend no puede conectarse a Supabase. **Es fácil de reparar.**

---

## Causa del Error

Tu sitio en Netlify **no tiene las variables de entorno** que necesita para conectarse a Supabase.

Las variables que faltan son:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sin estas, React no puede hablar con Supabase, y por lo tanto el Edge Function falla.

---

## Paso 1: Obtener tus Credenciales de Supabase

### En Supabase Dashboard:

1. Abre **[app.supabase.com](https://app.supabase.com)**
2. Entra a tu proyecto
3. Ve a **Settings** (esquina inferior izquierda)
4. Haz clic en **"API"**

### En la pantalla de API verás:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
Anon Public Key: eyJhbGciOi...xxxxxxxxxxxxx
Service Role Key: eyJhbGciOi...xxxxxxxxxxxxx (NO USES ESTE)
```

### Copia estos dos valores:

- **Project URL** → Cópialo
- **Anon Public Key** → Cópialo

(Deja los valores visibles, porque los necesitarás en el siguiente paso)

---

## Paso 2: Configurar en Netlify

### En tu sitio de Netlify:

1. Ve a **[netlify.com](https://netlify.com)**
2. Selecciona tu proyecto "carta-para-ella"
3. Ve a **Site Settings** (menú superior)
4. En el menú izquierdo, haz clic en **"Environment"** o **"Build & deploy"** → **"Environment variables"**
5. Haz clic en **"Edit variables"** o **"Add a variable"**

### Agrega PRIMERA variable:

- **Key:** `VITE_SUPABASE_URL`
- **Value:** Pega el Project URL que copiaste (ej: `https://xxxxxxxxxxxxx.supabase.co`)
- Haz clic en **"Save"** o **"Add"**

### Agrega SEGUNDA variable:

- **Key:** `VITE_SUPABASE_ANON_KEY`
- **Value:** Pega el Anon Public Key (la larga cadena que empieza con `eyJ...`)
- Haz clic en **"Save"**

**Debería verse así en Netlify:**

```
VITE_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOi...xxxxxxxxxxxxx
```

---

## Paso 3: Redeploy

### En Netlify:

1. Ve a **Deploys** (en el menú superior)
2. Haz clic en **"Trigger deploy"** → **"Deploy site"**
3. Espera a que termine (verás un checkmark verde)

**Tiempo:** ~2-5 minutos

---

## Paso 4: Prueba

1. Abre tu sitio en Netlify (ej: `tu-proyecto.netlify.app`)
2. Navega hasta la carta
3. Abre el sobre (3 clics)
4. Haz clic en **"Sí"**
5. Deberías ver: **"Notificación enviada a tu email"** ✓

---

## Si Aún No Funciona

### Check 1: Verifica que las variables estén configuradas

En Netlify → Site Settings → Environment:
- ¿Ves `VITE_SUPABASE_URL`?
- ¿Ves `VITE_SUPABASE_ANON_KEY`?

Si no, repite Paso 2.

### Check 2: Verifica que hiciste redeploy

En Netlify → Deploys:
- ¿Hay un deploy reciente (después de agregar las variables)?
- ¿Tiene checkmark verde (éxito)?

Si no, repite Paso 3.

### Check 3: Abre Developer Tools (F12)

1. Abre tu sitio
2. Presiona **F12** para abrir DevTools
3. Ve a **Console**
4. Haz clic en "Sí"
5. ¿Qué dice el error en rojo?

**Copia ese error y búscalo en Google** o envíamelo.

### Check 4: Verifica el archivo .env local

En tu proyecto local, en la raíz, ¿existe el archivo `.env`?

Si no existe, créalo con:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...xxxxxxxxxxxxx
```

(Los mismos valores que agregaste a Netlify)

Luego haz:
```bash
npm run build
```

Si el build local funciona, entonces Netlify debería funcionar también.

---

## Orden Correcto de Pasos para Que Funcione Todo

### 1. Configuración Inicial (una sola vez)

```
✅ Resend registrado → API key copiada
✅ Supabase secret configurado → RESEND_API_KEY
✅ content.json editado → email y nombre
✅ .env local → VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
```

### 2. Testing Local

```bash
npm run dev
# Abre http://localhost:5173
# Haz clic en "Sí"
# Recibe email ✓
```

### 3. Deploy en Netlify

```
✅ Conectar repositorio
✅ Netlify crea variables de entorno
✅ Agregar VITE_SUPABASE_URL
✅ Agregar VITE_SUPABASE_ANON_KEY
✅ Trigger deploy
```

### 4. Testing en Producción

```
✅ Abre tu-proyecto.netlify.app
✅ Haz clic en "Sí"
✅ Recibe email ✓
```

---

## Variables de Entorno Explicadas

### Local (.env)

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

El `VITE_` prefix es importante. Le dice a Vite que estas variables son **públicas** (se envían al cliente).

### Netlify

Las mismas variables, pero en el dashboard en lugar de archivo `.env`.

### Supabase Secrets

Son DIFERENTES de las variables de entorno. Los secretos son para:

```
RESEND_API_KEY=...  ← Esta es un secret, NO es una variable de entorno
```

Los secrets se protegen en el servidor (Edge Function). El cliente nunca los ve.

---

## Resumen Rápido

**Problema:** Variables de Supabase faltando en Netlify

**Solución:**

1. Copia `VITE_SUPABASE_URL` desde Supabase API settings
2. Copia `VITE_SUPABASE_ANON_KEY` desde Supabase API settings
3. Agrega ambas en Netlify → Environment variables
4. Trigger redeploy
5. Espera ~5 minutos
6. Prueba haciendo clic en "Sí"

**Tiempo total:** 5-10 minutos

---

## Contacto Si Falla

Si después de seguir estos pasos aún no funciona:

1. Abre DevTools (F12) → Console
2. Haz clic en "Sí"
3. Copia el mensaje de error completo
4. Describe exactamente qué pasos hiciste

---

## Checklist Final

- [ ] Accedí a Supabase API settings
- [ ] Copié Project URL
- [ ] Copié Anon Public Key
- [ ] Fui a Netlify Site Settings
- [ ] Agregué VITE_SUPABASE_URL
- [ ] Agregué VITE_SUPABASE_ANON_KEY
- [ ] Hice trigger deploy
- [ ] Esperé a que terminara (checkmark verde)
- [ ] Probé en el sitio publicado
- [ ] Recibí el email ✓

---

**¡Esto debería reparar el error!** Los 200 USD están justificados si logras que funcione el email 😎
