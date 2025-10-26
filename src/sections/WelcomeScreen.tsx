import { motion } from 'framer-motion';
import { useState } from 'react';
import TypeWriter from '../components/TypeWriter';
import AnimatedButton from '../components/AnimatedButton';
import Particles from '../components/Particles';

/**
 * Pantalla de bienvenida inicial
 * Muestra un mensaje con efecto typewriter y un botón animado
 * Fondo rosa palo con partículas brillantes flotantes
 */

interface WelcomeScreenProps {
  text: string; // Texto para el efecto typewriter
  buttonText: string; // Texto del botón
  onContinue: () => void; // Callback al hacer clic en el botón
}

export default function WelcomeScreen({
  text,
  buttonText,
  onContinue,
}: WelcomeScreenProps) {
  const [showButton, setShowButton] = useState(false); // Controla cuándo mostrar el botón

  // Cuando termina el efecto typewriter, mostrar el botón
  const handleTypewriterComplete = () => {
    setShowButton(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen
        bg-gradient-to-br from-rosa-palo via-rosa-claro to-rosa-suave
        flex items-center justify-center
        relative overflow-hidden
        px-4 sm:px-6 md:px-8
      "
    >
      {/* Partículas de fondo brillantes */}
      <Particles count={25} />

      {/* Contenido central */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Texto con efecto typewriter */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-gray-800 mb-12 leading-relaxed">
          <TypeWriter
            text={text}
            speed={60}
            onComplete={handleTypewriterComplete}
          />
        </h1>

        {/* Botón que aparece después del typewriter */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatedButton
              onClick={onContinue}
              variant="primary"
              animate={true} // Activar animación de latido
              className="text-lg px-10 py-4"
            >
              {buttonText}
            </AnimatedButton>
          </motion.div>
        )}
      </div>

      {/* Decoración: círculos suaves en las esquinas */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </motion.section>
  );
}
