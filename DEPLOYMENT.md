# Guía de Despliegue - Carta para Ella

Esta guía te ayudará a desplegar el sitio web en **Netlify** o **Vercel** de forma rápida y sencilla.

---

## Opción 1: Despliegue en Netlify

### Paso 1: Crear cuenta en Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita con tu email o GitHub

### Paso 2: Preparar el proyecto
Asegúrate de que tu proyecto esté en un repositorio de Git (GitHub, GitLab, o Bitbucket)

### Paso 3: Conectar y desplegar
1. En Netlify, haz clic en **"Add new site"** → **"Import an existing project"**
2. Selecciona tu proveedor de Git (GitHub recomendado)
3. Autoriza a Netlify para acceder a tus repositorios
4. Selecciona el repositorio del proyecto
5. Configura los ajustes de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Haz clic en **"Deploy site"**

### Paso 4: Configurar dominio (Opcional)
- Netlify te asignará un dominio temporal como: `random-name-123.netlify.app`
- Puedes cambiar el nombre en **Site settings** → **Change site name**
- O conectar tu propio dominio en **Domain settings**

---

## Opción 2: Despliegue en Vercel

### Paso 1: Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta gratuita (preferiblemente con GitHub)

### Paso 2: Importar proyecto
1. Haz clic en **"New Project"**
2. Selecciona **"Import Git Repository"**
3. Autoriza a Vercel para acceder a tus repositorios
4. Selecciona el repositorio del proyecto

### Paso 3: Configurar y desplegar
1. Vercel detectará automáticamente que es un proyecto Vite
2. Las configuraciones predeterminadas deberían ser correctas:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Haz clic en **"Deploy"**

### Paso 4: Configurar dominio (Opcional)
- Vercel te asignará un dominio como: `project-name.vercel.app`
- Puedes personalizar o agregar tu propio dominio en **Settings** → **Domains**

---

## Actualizaciones Futuras

### Para actualizar el contenido del sitio:

1. **Modificar textos:** Edita el archivo `src/content.json`
2. **Cambiar colores:** Edita `tailwind.config.js`
3. **Agregar nuevas secciones:** Crea componentes en `src/sections/`

### Para desplegar cambios:

1. Haz commit de tus cambios:
   ```bash
   git add .
   git commit -m "Actualización de contenido"
   git push
   ```

2. Netlify/Vercel desplegará automáticamente los cambios

---

## Comandos útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Verificar tipos TypeScript
npm run typecheck
```

---

## Estructura del Proyecto

```
proyecto/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── sections/        # Secciones de la página
│   ├── content.json     # Contenido editable
│   ├── App.tsx          # Componente principal
│   └── index.css        # Estilos globales
├── public/              # Archivos estáticos
└── dist/                # Build de producción
```

---

## Solución de Problemas

### Error: "Command not found: npm"
- Instala [Node.js](https://nodejs.org/) (versión 18 o superior)

### Error de build en Netlify/Vercel
- Verifica que el comando de build sea: `npm run build`
- Verifica que el directorio de publicación sea: `dist`

### Los cambios no se reflejan
- Limpia la caché del navegador (Ctrl+Shift+R)
- En Netlify: **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## Soporte

Si tienes problemas con el despliegue, consulta:
- [Documentación de Netlify](https://docs.netlify.com/)
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Vite](https://vitejs.dev/)
