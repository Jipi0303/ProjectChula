# 🚨 FIX DE EMERGENCIA - 1 MINUTO

Tu error: `"Variables de entorno de Supabase no configuradas"`

**Solución rápida:**

---

## PASO 1 (30 segundos)

**Abre:** https://app.supabase.com
- Selecciona tu proyecto
- Settings → API
- Copia: **Project URL**
- Copia: **Anon Public Key**

---

## PASO 2 (20 segundos)

**Abre:** https://netlify.com
- Selecciona tu proyecto
- Site Settings
- Busca: **Environment** (o Build & deploy → Environment variables)

---

## PASO 3 (10 segundos)

**Agrega PRIMERA variable:**
```
Key:   VITE_SUPABASE_URL
Value: https://xxxxxxxxxxxxx.supabase.co
       (Pega el Project URL)
```
Clic en Save

**Agrega SEGUNDA variable:**
```
Key:   VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOi...xxxxx
       (Pega el Anon Public Key)
```
Clic en Save

---

## PASO 4 (5 minutos de espera)

En Netlify → Deploys
- Clic en "Trigger deploy"
- Selecciona "Deploy site"
- **Espera a que termine** (ves checkmark verde ✓)

---

## LISTO ✓

Abre tu sitio y prueba haciendo clic en "Sí"

Deberías recibir email en 5-10 segundos.

---

**¿Sigue sin funcionar?**
→ Lee: `SOLUTION_CHECKLIST.md` (versión completa)

**¿Necesitas más detalle?**
→ Lee: `NETLIFY_ENV_SETUP_VISUAL.md` (con imágenes)
