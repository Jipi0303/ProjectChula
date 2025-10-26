# Carta para Ella

Una experiencia web romántica e interactiva creada con amor y código.

## Descripción

Este es un sitio web especial diseñado para expresar sentimientos de forma única y memorable. Combina diseño elegante, animaciones suaves y una narrativa progresiva que guía al visitante a través de diferentes secciones emocionales.

### Características

- **Efecto Typewriter:** Texto que se escribe letra por letra de forma elegante
- **Sobre Interactivo:** Requiere 3 clics para abrir la carta, con animaciones progresivas
- **Botones Animados:** El botón "No" se mueve y encoge hasta desaparecer
- **Partículas Flotantes:** Fondo con partículas brillantes que dan ambiente mágico
- **Panel de Novedades:** Sistema preparado para futuras funcionalidades
- **Diseño Responsive:** Optimizado para móvil, tablet y desktop
- **Contenido Editable:** Todo el texto en un archivo JSON para fácil modificación

## Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Estilos utilitarios
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos elegantes

## Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── AnimatedButton.tsx
│   ├── Envelope.tsx
│   ├── Particles.tsx
│   ├── SidePanel.tsx
│   └── TypeWriter.tsx
├── sections/         # Secciones principales
│   ├── WelcomeScreen.tsx
│   ├── DetalleSection.tsx
│   └── CartaSection.tsx
├── content.json      # Contenido editable
├── App.tsx           # Componente principal
└── index.css         # Estilos globales
```

## Modificar el Contenido

Todo el contenido del sitio está en `src/content.json`. Simplemente edita este archivo para cambiar los textos:

```json
{
  "welcome": {
    "text": "Tu mensaje personalizado...",
    "buttonText": "Abrir carta 💌"
  },
  "detalle": {
    "title": "El detalle",
    "text": "Tu mensaje aquí...",
    "buttonText": "Seguir leyendo →"
  },
  "carta": {
    "message": "Tu carta especial...",
    "yesButton": "Sí",
    "noButton": "No",
    "successMessage": "¡Mensaje de éxito!"
  }
}
```

## Paleta de Colores

El sitio usa una paleta romántica y elegante:

- **Rosa Palo** (#F5C7C7) - Color principal
- **Beige** (#F5E6D3) - Color secundario
- **Humo** (#F8F8F8) - Fondos suaves
- **Dorado** (#D4AF37) - Acentos elegantes

Puedes modificar estos colores en `tailwind.config.js`.

## Despliegue

### Netlify (Recomendado)

1. Conecta tu repositorio en [netlify.com](https://netlify.com)
2. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automático en cada push

### Vercel

1. Importa el proyecto en [vercel.com](https://vercel.com)
2. Vercel detectará automáticamente la configuración
3. Deploy en un clic

## Documentación Adicional

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía detallada de despliegue
- **[TECHNICAL_GUIDE.md](./TECHNICAL_GUIDE.md)** - Guía técnica completa para modificaciones
- **[FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)** - Ideas y mejoras futuras

## Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build
npm run typecheck    # Verificar tipos TypeScript
npm run lint         # Analizar código
```

## Características Técnicas Destacadas

### Componentes Modulares
Cada componente está diseñado para ser reutilizable y fácil de mantener. Los comentarios en el código explican la funcionalidad de cada sección.

### Animaciones Optimizadas
Uso de Framer Motion para animaciones GPU-accelerated que no afectan el rendimiento.

### Responsive por Diseño
Sistema de breakpoints que garantiza buena experiencia en cualquier dispositivo:
- Mobile: 320px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

### Escalabilidad
Arquitectura preparada para:
- Agregar nuevas secciones/cartas
- Sistema de rutas múltiples
- Integración con base de datos
- Modo oscuro
- Autenticación

## Próximas Funcionalidades

El panel lateral ya está preparado para funcionalidades futuras:
- Cartas anteriores archivadas
- Próximas sorpresas programadas
- Playlist de música compartida
- Modo secreto con contraseña

## Personalización Rápida

### Cambiar Velocidad de Animaciones
En `src/sections/WelcomeScreen.tsx`:
```tsx
<TypeWriter speed={60} />  // Menor = más rápido
```

### Cambiar Número de Partículas
En `src/sections/WelcomeScreen.tsx`:
```tsx
<Particles count={25} />  // Más = más densidad
```

### Cambiar Fuentes
Modifica el link en `index.html` y actualiza `tailwind.config.js`.

## Licencia

Este es un proyecto personal. Siéntete libre de usarlo como inspiración para tus propios proyectos románticos.

## Notas del Desarrollador

Este sitio fue creado con atención al detalle, pensando en la experiencia del usuario y la escalabilidad futura. Cada animación, cada transición y cada elemento fue cuidadosamente diseñado para crear un momento especial.

El código está ampliamente comentado para facilitar futuras modificaciones. Si tienes dudas sobre cómo funciona algo, consulta los comentarios en el código o los documentos de guía técnica.

---

Hecho con código y cariño 💌
