# Configuración de Git y GitHub

Esta guía te ayudará a configurar el control de versiones y subir tu proyecto a GitHub.

---

## Paso 1: Verificar Git

Primero, verifica que tienes Git instalado:

```bash
git --version
```

Si no lo tienes, descárgalo de [git-scm.com](https://git-scm.com/)

---

## Paso 2: Configurar Git (Primera vez)

Si es tu primera vez usando Git, configura tu identidad:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@ejemplo.com"
```

---

## Paso 3: Inicializar Repositorio Local

En la carpeta del proyecto, ejecuta:

```bash
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Carta para Ella"
```

---

## Paso 4: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) y haz login
2. Haz clic en el botón **"+"** → **"New repository"**
3. Configuración recomendada:
   - **Repository name:** `carta-para-ella` (o el nombre que prefieras)
   - **Description:** "Una carta digital interactiva y romántica"
   - **Visibility:** Private (recomendado para privacidad)
   - **NO** marques "Initialize with README" (ya tienes uno)
4. Haz clic en **"Create repository"**

---

## Paso 5: Conectar Local con GitHub

GitHub te mostrará instrucciones. Usa estas:

```bash
# Agregar el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/carta-para-ella.git

# Cambiar el nombre de la rama principal a 'main'
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

---

## Comandos Git Básicos para el Día a Día

### Ver el Estado de tus Cambios
```bash
git status
```

### Agregar Cambios al Staging
```bash
# Agregar todos los archivos modificados
git add .

# O agregar archivos específicos
git add src/content.json
```

### Hacer un Commit
```bash
git commit -m "Descripción clara de los cambios"
```

### Subir Cambios a GitHub
```bash
git push
```

### Ver el Historial de Commits
```bash
git log --oneline
```

### Descargar Cambios de GitHub
```bash
git pull
```

---

## Flujo de Trabajo Recomendado

### Cuando Modificas el Contenido

```bash
# 1. Edita src/content.json con tus cambios
# 2. Guarda el archivo
# 3. Verifica los cambios
git status

# 4. Agrega los cambios
git add src/content.json

# 5. Haz commit con mensaje descriptivo
git commit -m "Actualizar mensaje de bienvenida"

# 6. Sube a GitHub
git push
```

### Cuando Agregas Nuevas Funcionalidades

```bash
# 1. Crea una nueva rama para la funcionalidad
git checkout -b feature/galeria-fotos

# 2. Haz tus cambios y commits
git add .
git commit -m "Agregar galería de fotos"

# 3. Vuelve a la rama principal
git checkout main

# 4. Fusiona los cambios
git merge feature/galeria-fotos

# 5. Sube los cambios
git push
```

---

## Mensajes de Commit Recomendados

Usa mensajes claros que describan qué cambios hiciste:

**Buenos ejemplos:**
- `"Actualizar mensaje de la carta principal"`
- `"Cambiar colores de rosa a azul"`
- `"Agregar sección de galería de fotos"`
- `"Fix: Corregir botón en móvil"`
- `"Optimizar animaciones para mejor performance"`

**Malos ejemplos:**
- `"cambios"`
- `"fix"`
- `"actualización"`
- `"asdfgh"`

---

## Archivo .gitignore

El proyecto ya incluye un `.gitignore` que evita subir archivos innecesarios. Estos archivos NO se suben a GitHub:

- `node_modules/` - Dependencias (se reinstalan con `npm install`)
- `dist/` - Build de producción (se genera con `npm run build`)
- `.env.local` - Variables de entorno privadas
- Archivos del sistema (`.DS_Store`, etc.)

---

## Trabajar con Variables de Entorno Privadas

Si agregas información sensible (como claves API), usa un archivo `.env.local`:

```bash
# .env.local (NO se sube a GitHub)
VITE_API_KEY=tu-clave-secreta
```

Para producción, configura estas variables en Netlify/Vercel:
- En Netlify: **Site settings** → **Environment variables**
- En Vercel: **Settings** → **Environment Variables**

---

## Revertir Cambios

### Descartar Cambios Locales No Guardados
```bash
# Descartar cambios de un archivo específico
git checkout -- src/content.json

# Descartar todos los cambios
git reset --hard
```

### Revertir el Último Commit
```bash
# Revertir pero mantener los cambios
git reset --soft HEAD~1

# Revertir y eliminar los cambios
git reset --hard HEAD~1
```

---

## Integración con Netlify/Vercel

Una vez que tu código esté en GitHub:

1. **Netlify/Vercel detecta cambios automáticamente**
2. Cada vez que hagas `git push`, se despliega automáticamente
3. Puedes ver el progreso del deploy en sus dashboards

### Desactivar Deploy Automático (Opcional)

En Netlify:
- **Site settings** → **Build & deploy** → **Build settings**
- Desactiva "Auto publishing"

En Vercel:
- **Settings** → **Git** → Configurar qué ramas disparan deploys

---

## Colaborar con Otros

Si quieres que alguien más contribuya:

1. **Agregar colaborador en GitHub:**
   - Repositorio → **Settings** → **Collaborators**
   - Invita por email o usuario

2. **Ellos clonan el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/carta-para-ella.git
   cd carta-para-ella
   npm install
   ```

3. **Flujo de trabajo:**
   - Cada uno trabaja en su propia rama
   - Hacen Pull Requests para revisar cambios
   - Fusionan a la rama principal tras revisión

---

## Comandos de Emergencia

### Perdiste Cambios y Quieres Recuperarlos
```bash
git reflog
# Encuentra el commit que necesitas
git checkout [hash-del-commit]
```

### Conflictos al Hacer Pull
```bash
# Ocurre cuando hay cambios en GitHub y localmente
git pull
# Git marca los conflictos en los archivos
# Edita manualmente los archivos
# Luego:
git add .
git commit -m "Resolver conflictos"
git push
```

---

## Recursos Adicionales

- [Git Cheat Sheet Oficial](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Guides](https://guides.github.com/)
- [Aprende Git Branching](https://learngitbranching.js.org/?locale=es_ES)

---

## Resumen Rápido

```bash
# Configuración inicial (una sola vez)
git init
git add .
git commit -m "Initial commit"
git remote add origin [URL]
git push -u origin main

# Flujo diario
git status              # Ver cambios
git add .               # Preparar cambios
git commit -m "..."     # Guardar cambios
git push                # Subir a GitHub
```

---

Este archivo te servirá como referencia rápida para manejar el control de versiones de tu proyecto.
