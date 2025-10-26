import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';

/**
 * Componente de sobre animado interactivo
 * Requiere 3 clics para abrirse completamente
 * Progresión: cerrado -> vibración -> vibración más fuerte -> abierto
 * Una vez abierto, muestra el contenido con borde dorado
 */

interface EnvelopeProps {
  onOpen: () => void; // Callback cuando el sobre se abre completamente
  children: React.ReactNode; // Contenido de la carta (se muestra al abrir)
}

export default function Envelope({ onOpen, children }: EnvelopeProps) {
  const [clickCount, setClickCount] = useState(0); // Contador de clics
  const [isOpen, setIsOpen] = useState(false); // Estado de apertura

  // Manejar clics en el sobre
  const handleClick = () => {
    if (isOpen) return; // Si ya está abierto, no hacer nada

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Al tercer clic, abrir el sobre
    if (newCount >= 3) {
      setIsOpen(true);
      onOpen();
    }
  };

  // Determinar la animación según el número de clics
  const getShakeAnimation = () => {
    if (clickCount === 1) {
      // Primera vibración suave
      return { x: [-5, 5, -5, 5, 0], rotate: [-2, 2, -2, 2, 0] };
    } else if (clickCount === 2) {
      // Segunda vibración más intensa
      return { x: [-10, 10, -10, 10, 0], rotate: [-5, 5, -5, 5, 0] };
    }
    return {};
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Sobre cerrado
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            onClick={handleClick}
            animate={getShakeAnimation()}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Contenedor del sobre */}
            <div className="relative w-64 h-40 sm:w-80 sm:h-48 bg-beige rounded-lg shadow-2xl overflow-hidden">
              {/* Solapa superior del sobre */}
              <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-beige-oscuro clip-triangle" />

              {/* Icono de carta en el centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-rosa-palo" />
              </div>

              {/* Indicador de progreso (puntos) */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      clickCount >= dot ? 'bg-rosa-palo scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Texto de instrucción */}
            <motion.p
              className="text-center mt-4 text-sm sm:text-base text-gray-600 font-body"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Haz clic {3 - clickCount} {3 - clickCount === 1 ? 'vez' : 'veces'} más...
            </motion.p>
          </motion.div>
        ) : (
          // Carta abierta
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full"
          >
            {/* Contenedor de la carta con borde dorado */}
            <div
              className="
                bg-white/95 backdrop-blur-sm
                rounded-2xl
                shadow-2xl
                border-4 border-dorado
                p-6 sm:p-8 md:p-10
                max-w-lg mx-auto
              "
            >
              {/* Contenido de la carta */}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
