/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Paleta de colores romántica personalizada
      colors: {
        // Rosa palo principal
        'rosa-palo': '#F5C7C7',
        'rosa-claro': '#FFE5E5',
        'rosa-suave': '#FFD1D1',
        // Beige y neutros
        'beige': '#F5E6D3',
        'beige-oscuro': '#E8D4BD',
        'humo': '#F8F8F8',
        // Dorado para acentos
        'dorado': '#D4AF37',
        'dorado-claro': '#F2E6C9',
      },
      // Tipografías elegantes
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Raleway', 'sans-serif'],
      },
      // Animaciones personalizadas
      keyframes: {
        // Animación de latido para el botón
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        // Efecto de float suave
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Brillo de partículas
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        // Typewriter cursor blink
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
