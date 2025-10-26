import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import { Sparkles } from 'lucide-react';

/**
 * Sección "El Detalle"
 * Muestra un mensaje dulce con animaciones sutiles
 * Incluye partículas de confeti y transición suave
 */

interface DetalleSectionProps {
  title: string; // Título de la sección
  text: string; // Texto del mensaje
  buttonText: string; // Texto del botón
  onContinue: () => void; // Callback al continuar
}

export default function DetalleSection({
  title,
  text,
  buttonText,
  onContinue,
}: DetalleSectionProps) {
  // Convertir saltos de línea en el texto a elementos <br />
  const formattedText = text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen
        bg-gradient-to-br from-beige via-humo to-rosa-claro
        flex items-center justify-center
        relative overflow-hidden
        px-4 sm:px-6 md:px-8
        py-12
      "
    >
      {/* Contenedor principal con fondo translúcido */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="
          relative
          bg-white/70 backdrop-blur-md
          rounded-3xl
          shadow-2xl
          p-8 sm:p-10 md:p-12
          max-w-2xl
          border border-rosa-palo/30
        "
      >
        {/* Icono decorativo con animación */}
        <motion.div
          className="flex justify-center mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-12 h-12 text-rosa-palo" />
        </motion.div>

        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-800 text-center mb-6">
          {title}
        </h2>

        {/* Texto principal */}
        <p className="text-base sm:text-lg md:text-xl font-body text-gray-700 text-center leading-relaxed mb-8">
          {formattedText}
        </p>

        {/* Botón para continuar */}
        <div className="flex justify-center">
          <AnimatedButton
            onClick={onContinue}
            variant="primary"
            className="text-base sm:text-lg"
          >
            {buttonText}
          </AnimatedButton>
        </div>

        {/* Decoración: pequeñas partículas flotantes */}
        <motion.div
          className="absolute top-4 right-4 w-3 h-3 bg-rosa-suave rounded-full"
          animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 left-8 w-2 h-2 bg-rosa-palo rounded-full"
          animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/3 left-4 w-2 h-2 bg-dorado rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Decoración de fondo: círculos difuminados */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-rosa-palo/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-beige/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </motion.section>
  );
}
