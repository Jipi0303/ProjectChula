# Guía Técnica - Carta para Ella

Esta guía explica la arquitectura del proyecto y cómo realizar modificaciones comunes.

---

## Arquitectura del Proyecto

### Tecnologías Principales
- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TailwindCSS** - Estilos utilitarios
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos

### Estructura de Componentes

```
src/
├── components/           # Componentes reutilizables
│   ├── AnimatedButton.tsx    # Botón con animaciones
│   ├── Envelope.tsx          # Sobre interactivo (3 clics)
│   ├── Particles.tsx         # Partículas brillantes de fondo
│   ├── SidePanel.tsx         # Panel lateral de novedades
│   └── TypeWriter.tsx        # Efecto máquina de escribir
│
├── sections/            # Secciones de la página
│   ├── WelcomeScreen.tsx     # Pantalla inicial
│   ├── DetalleSection.tsx    # Sección "El detalle"
│   └── CartaSection.tsx      # Carta principal con sobre
│
├── App.tsx              # Orquestador principal
├── content.json         # Todo el contenido editable
└── index.css            # Estilos globales
```

---

## Modificaciones Comunes

### 1. Cambiar el Contenido del Sitio

**Archivo:** `src/content.json`

```json
{
  "welcome": {
    "text": "Tu mensaje aquí...",
    "buttonText": "Texto del botón"
  },
  "detalle": {
    "title": "Título de la sección",
    "text": "Mensaje con saltos de línea\nOtra línea",
    "buttonText": "Continuar"
  },
  "carta": {
    "message": "Mensaje de la carta\nPuedes usar saltos de línea",
    "yesButton": "Sí",
    "noButton": "No",
    "successMessage": "Mensaje de éxito"
  }
}
```

**Notas:**
- Usa `\n` para saltos de línea
- Los cambios se reflejan automáticamente al guardar

---

### 2. Cambiar Colores del Sitio

**Archivo:** `tailwind.config.js`

```js
colors: {
  'rosa-palo': '#F5C7C7',      // Color principal
  'rosa-claro': '#FFE5E5',     // Fondos suaves
  'rosa-suave': '#FFD1D1',     // Hover states
  'beige': '#F5E6D3',          // Color secundario
  'dorado': '#D4AF37',         // Acentos elegantes
}
```

**Cómo cambiar:**
1. Busca un generador de paletas (ej: [coolors.co](https://coolors.co))
2. Reemplaza los valores hexadecimales
3. Mantén los nombres de las variables para no romper nada

---

### 3. Modificar Animaciones

**Velocidad del Typewriter:**
```tsx
// En WelcomeScreen.tsx
<TypeWriter
  text={text}
  speed={60}  // ← Cambia este valor (menor = más rápido)
  onComplete={handleTypewriterComplete}
/>
```

**Intensidad del latido del botón:**
```tsx
// En AnimatedButton.tsx, línea 30
animate={{ scale: [1, 1.05, 1, 1.05, 1] }}  // ← Cambia 1.05 a otro valor
```

**Número de partículas:**
```tsx
// En WelcomeScreen.tsx
<Particles count={25} />  // ← Cambia el número (recomendado: 15-30)
```

---

### 4. Agregar una Nueva Sección

**Paso 1:** Crear el componente en `src/sections/NuevaSeccion.tsx`

```tsx
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';

interface NuevaSeccionProps {
  onContinue: () => void;
}

export default function NuevaSeccion({ onContinue }: NuevaSeccionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-rosa-palo to-beige flex items-center justify-center"
    >
      <div className="text-center">
        <h2 className="text-4xl font-display mb-6">Tu Título</h2>
        <p className="text-xl font-body mb-8">Tu contenido aquí</p>
        <AnimatedButton onClick={onContinue}>Continuar</AnimatedButton>
      </div>
    </motion.section>
  );
}
```

**Paso 2:** Agregar al flujo en `App.tsx`

```tsx
// Importar el componente
import NuevaSeccion from './sections/NuevaSeccion';

// Agregar al renderizado
{currentSection === 3 && (
  <NuevaSeccion
    key="nueva"
    onContinue={() => setCurrentSection(4)}
  />
)}
```

---

### 5. Modificar el Panel Lateral

**Agregar nuevos items:**

En `src/content.json`:
```json
"panel": {
  "items": [
    {
      "icon": "mail",           // Opciones: mail, heart, music, lock
      "text": "Tu texto aquí",
      "available": true         // true = clickeable, false = próximamente
    }
  ]
}
```

**Agregar funcionalidad a un item:**

En `src/components/SidePanel.tsx`, modifica el mapeo de items para agregar `onClick`:

```tsx
<motion.div
  onClick={() => {
    if (item.available) {
      // Tu lógica aquí
      console.log('Item clickeado:', item.text);
    }
  }}
  // ... resto del código
>
```

---

### 6. Cambiar Fuentes Tipográficas

**Paso 1:** Selecciona fuentes en [Google Fonts](https://fonts.google.com/)

**Paso 2:** Reemplaza el link en `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=TuFuente:wght@300;400;600&display=swap" rel="stylesheet">
```

**Paso 3:** Actualiza `tailwind.config.js`:
```js
fontFamily: {
  'display': ['Tu Fuente Display', 'serif'],
  'body': ['Tu Fuente Body', 'sans-serif'],
}
```

---

### 7. Ajustar Responsividad

Los breakpoints de Tailwind:
- `sm:` - Móviles grandes (640px+)
- `md:` - Tablets (768px+)
- `lg:` - Laptops (1024px+)
- `xl:` - Desktops (1280px+)

**Ejemplo de uso:**
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Título responsivo
</h1>
```

---

### 8. Modo Oscuro (Mejora Futura)

**Paso 1:** Agregar estado en `App.tsx`:
```tsx
const [darkMode, setDarkMode] = useState(false);
```

**Paso 2:** Agregar clase condicional:
```tsx
<div className={darkMode ? 'dark' : ''}>
  {/* contenido */}
</div>
```

**Paso 3:** Usar clases dark: en componentes:
```tsx
<div className="bg-rosa-palo dark:bg-gray-800">
```

---

## Mejoras Sugeridas

### 1. Modo Aniversario Automático
Detecta fechas especiales y cambia colores/animaciones:

```tsx
// En App.tsx
const isAniversario = new Date().getMonth() === 5 && new Date().getDate() === 15;
const colors = isAniversario ? aniversarioColors : defaultColors;
```

### 2. Música de Fondo
Agregar un reproductor de Spotify:

```tsx
<iframe
  src="https://open.spotify.com/embed/playlist/TU_PLAYLIST_ID"
  width="300"
  height="80"
  frameBorder="0"
/>
```

### 3. Sistema de Cartas Múltiples
Crear rutas con React Router:

```bash
npm install react-router-dom
```

```tsx
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<CartaPrincipal />} />
    <Route path="/carta2" element={<SegundaCarta />} />
    <Route path="/aniversario" element={<CartaAniversario />} />
  </Routes>
</BrowserRouter>
```

### 4. Contraseña para "Modo Secreto"
```tsx
const [password, setPassword] = useState('');
const secretPassword = 'tucontraseña';

if (password === secretPassword) {
  // Mostrar contenido secreto
}
```

---

## Convenciones de Código

### Comentarios
Cada archivo tiene comentarios explicativos al inicio que describen su propósito.

### Nomenclatura
- **Componentes:** PascalCase (`AnimatedButton.tsx`)
- **Variables:** camelCase (`isOpen`, `clickCount`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_ATTEMPTS`)

### Props
Todas las props tienen interfaces TypeScript definidas para mejor autocompletado.

---

## Depuración

### Ver logs en el navegador
Abre DevTools (F12) → Console

### Verificar errores de build
```bash
npm run build
```

### Verificar tipos TypeScript
```bash
npm run typecheck
```

---

## Recursos Adicionales

- [React Docs](https://react.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Contacto y Mantenimiento

Este proyecto está diseñado para ser fácil de mantener y expandir. Todos los archivos están comentados para facilitar futuras modificaciones.

**Estructura modular:** Cada componente es independiente y reutilizable.
**Separación de contenido:** El archivo `content.json` mantiene todo el texto separado del código.
**Sistema de animaciones:** Usa Framer Motion para transiciones suaves y profesionales.
