# Guía de Inicio Rápido

Esta es una guía express para empezar a usar y personalizar el proyecto inmediatamente.

---

## Instalación en 3 Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# El servidor te dirá la URL (usualmente http://localhost:5173)
```

---

## Personalizaciones Inmediatas

### 1. Cambiar los Textos (5 minutos)

**Archivo:** `src/content.json`

Simplemente edita el JSON y guarda. Los cambios se verán inmediatamente:

```json
{
  "welcome": {
    "text": "Tu mensaje personalizado aquí...",
    "buttonText": "Texto del botón"
  }
}
```

**Tip:** Usa `\n` para saltos de línea:
```json
"text": "Primera línea\nSegunda línea\nTercera línea"
```

---

### 2. Cambiar los Colores (10 minutos)

**Archivo:** `tailwind.config.js`

Busca la sección `colors` y cambia los valores hexadecimales:

```js
colors: {
  'rosa-palo': '#F5C7C7',  // Cambia este valor
  'beige': '#F5E6D3',      // Y este
  'dorado': '#D4AF37',     // Y este
}
```

**Herramienta recomendada:** [coolors.co](https://coolors.co/) para generar paletas

**Ejemplo de paletas alternativas:**

**Azul sereno:**
```js
'azul-suave': '#B4D7F1',
'azul-cielo': '#D4E7F7',
'azul-marino': '#5B9BD5',
```

**Verde natural:**
```js
'verde-menta': '#C7E8D9',
'verde-claro': '#E5F5ED',
'verde-bosque': '#7CB8A0',
```

**Lavanda elegante:**
```js
'lavanda': '#D8C7E8',
'lila-claro': '#EDE5F3',
'purpura-suave': '#B8A0D2',
```

---

### 3. Cambiar las Fuentes (15 minutos)

**Paso 1:** Ve a [Google Fonts](https://fonts.google.com/)

**Paso 2:** Selecciona 2 fuentes:
- Una para títulos (elegante, con serifa)
- Una para texto (legible, sin serifa)

**Paso 3:** Copia el link y pégalo en `index.html`:

```html
<!-- Reemplaza esta línea -->
<link href="https://fonts.googleapis.com/css2?family=TuFuente&display=swap" rel="stylesheet">
```

**Paso 4:** Actualiza `tailwind.config.js`:

```js
fontFamily: {
  'display': ['Tu Fuente Display', 'serif'],
  'body': ['Tu Fuente Body', 'sans-serif'],
}
```

**Combinaciones recomendadas:**
- Títulos: Playfair Display / Cormorant / Crimson Text
- Texto: Raleway / Inter / Poppins / Montserrat

---

### 4. Ajustar las Animaciones (5 minutos)

#### Velocidad del Typewriter

**Archivo:** `src/sections/WelcomeScreen.tsx` (línea ~20)

```tsx
<TypeWriter
  text={text}
  speed={60}  // ← Menor = más rápido (30-100 recomendado)
/>
```

#### Intensidad de las Partículas

**Archivo:** `src/sections/WelcomeScreen.tsx` (línea ~30)

```tsx
<Particles count={25} />  // ← Más = más partículas (15-40)
```

#### Latido del Botón

**Archivo:** `src/components/AnimatedButton.tsx` (línea ~30)

```tsx
animate={{ scale: [1, 1.05, 1, 1.05, 1] }}
// Cambia 1.05 a:
// 1.1 = más intenso
// 1.02 = más sutil
```

---

### 5. Cambiar el GIF de Éxito (2 minutos)

**Archivo:** `src/App.tsx` (línea ~60)

Reemplaza la URL del GIF por cualquier URL de Giphy:

```tsx
successGif="https://media.giphy.com/media/TU_GIF_ID/giphy.gif"
```

**Cómo encontrar GIFs:**
1. Ve a [giphy.com](https://giphy.com)
2. Busca un GIF (ej: "happy dog", "celebration")
3. Haz clic en el GIF → Share → Copy GIF Link
4. Pega la URL en el código

---

## Estructura de Flujo de la App

```
1. WelcomeScreen (Pantalla inicial)
   ↓ Clic en "Abrir carta"

2. DetalleSection (Mensaje dulce)
   ↓ Clic en "Seguir leyendo"

3. CartaSection (Sobre interactivo)
   ↓ 3 clics en el sobre
   ↓ Carta abierta con botones Sí/No
   ↓ Clic en "Sí"
   ↓ Modal de éxito
```

---

## Testing Local

### Ver en tu teléfono mientras desarrollas

1. Asegúrate de estar en la misma red WiFi
2. Encuentra tu IP local:
   - **Windows:** `ipconfig` (busca IPv4)
   - **Mac/Linux:** `ifconfig` (busca inet)
3. En tu teléfono, abre: `http://TU-IP:5173`
   - Ejemplo: `http://192.168.1.100:5173`

---

## Comandos Esenciales

```bash
# Desarrollo
npm run dev        # Iniciar servidor (localhost:5173)
npm run build      # Construir para producción
npm run preview    # Ver el build antes de desplegar

# Verificación
npm run typecheck  # Verificar errores de TypeScript
npm run lint       # Verificar errores de código
```

---

## Solución Rápida de Problemas

### El sitio no carga / Pantalla blanca
```bash
# Limpia todo y reinstala
rm -rf node_modules
npm install
npm run dev
```

### Los cambios no se reflejan
1. Guarda el archivo (Ctrl+S / Cmd+S)
2. Si no funciona, recarga el navegador (Ctrl+R / Cmd+R)
3. Si aún no funciona, recarga forzado (Ctrl+Shift+R)

### Error "Cannot find module"
```bash
# Reinstala dependencias
npm install
```

### Errores de TypeScript
```bash
# Verifica qué archivos tienen errores
npm run typecheck
```

---

## Checklist Antes de Desplegar

- [ ] Cambié todos los textos en `content.json`
- [ ] Probé que todas las animaciones funcionan
- [ ] Verifiqué que se ve bien en móvil
- [ ] El build compila sin errores (`npm run build`)
- [ ] El título del navegador está correcto (en `index.html`)

---

## Próximos Pasos

1. **Inmediato:** Personaliza contenido, colores y fuentes
2. **Corto plazo:** Revisa `DEPLOYMENT.md` para publicar el sitio
3. **Mediano plazo:** Explora `FUTURE_IMPROVEMENTS.md` para nuevas ideas
4. **Largo plazo:** Lee `TECHNICAL_GUIDE.md` para modificaciones avanzadas

---

## Tips Profesionales

### Uso de DevTools
- Presiona **F12** para abrir DevTools del navegador
- **Console:** Ver errores y logs
- **Elements:** Inspeccionar y modificar CSS en tiempo real
- **Network:** Ver qué archivos se cargan

### Hot Reload
Los cambios en el código se reflejan automáticamente sin recargar la página.

### Prettier (Opcional)
Para formatear el código automáticamente:
```bash
npm install --save-dev prettier
npx prettier --write .
```

---

## Recursos Rápidos

- **Colores:** [coolors.co](https://coolors.co/)
- **Fuentes:** [fonts.google.com](https://fonts.google.com/)
- **GIFs:** [giphy.com](https://giphy.com/)
- **Iconos:** [lucide.dev](https://lucide.dev/)
- **Gradientes:** [cssgradient.io](https://cssgradient.io/)

---

## Soporte

Si algo no funciona:
1. Revisa la consola del navegador (F12)
2. Lee el error completo
3. Busca el error en Google
4. Consulta `TECHNICAL_GUIDE.md` para más detalles

---

Ahora estás listo para empezar. ¡Diviértete personalizando tu carta especial! 💌
