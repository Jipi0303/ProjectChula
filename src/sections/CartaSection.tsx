import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Envelope from '../components/Envelope';
import AnimatedButton from '../components/AnimatedButton';

/**
 * Sección de la carta principal con sobre interactivo
 * Incluye botones Sí/No con comportamiento divertido
 * El botón "No" se mueve y encoge hasta desaparecer
 */

interface CartaSectionProps {
  message: string; // Mensaje de la carta
  yesButton: string; // Texto del botón Sí
  noButton: string; // Texto del botón No
  successMessage: string; // Mensaje al aceptar
  successGif?: string; // URL opcional de GIF celebración
}

export default function CartaSection({
  message,
  yesButton,
  noButton,
  successMessage,
  successGif,
}: CartaSectionProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false); // Estado del sobre
  const [showButtons, setShowButtons] = useState(false); // Mostrar botones después de abrir
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 }); // Posición del botón No
  const [noButtonScale, setNoButtonScale] = useState(1); // Escala del botón No
  const [noAttempts, setNoAttempts] = useState(0); // Intentos de clic en "No"
  const [showSuccess, setShowSuccess] = useState(false); // Modal de éxito
  const noButtonRef = useRef<HTMLDivElement>(null);

  // Cuando se abre el sobre, mostrar botones después de un delay
  useEffect(() => {
    if (isEnvelopeOpen) {
      setTimeout(() => setShowButtons(true), 800);
    }
  }, [isEnvelopeOpen]);

  // Manejar clic en el botón "Sí"
  const handleYes = () => {
    setShowSuccess(true);
  };

  // Manejar hover sobre el botón "No" - lo mueve aleatoriamente
  const handleNoHover = () => {
    const attempts = noAttempts + 1;
    setNoAttempts(attempts);

    // Reducir el tamaño progresivamente
    const newScale = Math.max(0.3, 1 - attempts * 0.15);
    setNoButtonScale(newScale);

    // Si ya intentó muchas veces, hacer desaparecer el botón
    if (attempts >= 5) {
      setNoButtonScale(0);
      return;
    }

    // Mover a una posición aleatoria dentro del contenedor
    const maxX = window.innerWidth < 640 ? 50 : 100;
    const maxY = 50;
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    setNoButtonPosition({ x: randomX, y: randomY });
  };

  // Formatear el mensaje con saltos de línea
  const formattedMessage = message.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < message.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen
        bg-gradient-to-br from-humo via-beige to-rosa-claro
        flex items-center justify-center
        relative overflow-hidden
        px-4 sm:px-6 md:px-8
        py-12
      "
    >
      {/* Contenedor del sobre y carta */}
      <div className="relative z-10 w-full">
        <Envelope onOpen={() => setIsEnvelopeOpen(true)}>
          {/* Contenido de la carta */}
          <div className="text-center">
            <p className="text-lg sm:text-xl md:text-2xl font-display text-gray-800 leading-relaxed mb-8">
              {formattedMessage}
            </p>

            {/* Botones Sí/No */}
            {showButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
              >
                {/* Botón "Sí" - crece al aparecer */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  <AnimatedButton
                    onClick={handleYes}
                    variant="primary"
                    animate={true}
                    className="text-lg px-12 py-3"
                  >
                    {yesButton}
                  </AnimatedButton>
                </motion.div>

                {/* Botón "No" - se mueve y encoge */}
                <AnimatePresence>
                  {noButtonScale > 0 && (
                    <motion.div
                      ref={noButtonRef}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: noButtonScale,
                        x: noButtonPosition.x,
                        y: noButtonPosition.y,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: 0.3,
                      }}
                      onMouseEnter={handleNoHover}
                      onTouchStart={handleNoHover}
                      className="relative"
                    >
                      <AnimatedButton
                        variant="danger"
                        className="text-lg px-12 py-3"
                      >
                        {noButton}
                      </AnimatedButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </Envelope>
      </div>

      {/* Modal de éxito */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="
                bg-gradient-to-br from-rosa-claro to-beige
                rounded-3xl
                shadow-2xl
                p-8 sm:p-12
                max-w-md
                text-center
                border-4 border-dorado
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mensaje de éxito */}
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-800 mb-6">
                {successMessage}
              </h2>

              {/* GIF opcional */}
              {successGif && (
                <div className="mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={successGif}
                    alt="Celebration"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Animación de confeti con emojis */}
              <div className="text-6xl mb-6 animate-bounce">
                🎉
              </div>

              {/* Botón para cerrar */}
              <AnimatedButton
                onClick={() => setShowSuccess(false)}
                variant="primary"
              >
                Cerrar
              </AnimatedButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rosa-palo/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-beige/30 rounded-full blur-3xl" />
    </motion.section>
  );
}
