import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import Particles from '../components/Particles';
import AnimatedButton from '../components/AnimatedButton';
import pruebaHtml from '../components/prueba1.html?raw';
import sopaScript from '../components/sopa2.js?raw';

/**
 * Sección "Sopa de Letras"
 *
 * Integra el juego tal cual fue provisto (prueba1.html + sopa2.js) dentro de
 * un iframe con srcDoc. Esto preserva intactos el CSS y el JS del juego
 * (incluida la lógica de arrastre, selección en línea recta, diagonales, etc.)
 * y los aísla del ámbito global de React.
 *
 * Comunicación iframe -> React: se inyecta un pequeño script que hace
 * postMessage al padre cuando el juego termina (ganó o perdió), indicando
 * el temporizador activo (número de estrellas).
 *
 * El botón "Ir a la carta" permanece deshabilitado hasta que el juego
 * se gana. Al ganar, se muestra un modal de felicitación con el puntaje
 * en estrellas, reutilizando la animación del modal de CartaSection.
 */

interface SopaSectionProps {
  onContinue: () => void;
}

export default function SopaSection({ onContinue }: SopaSectionProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [gameWon, setGameWon] = useState(false);
  const [stars, setStars] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Script puente: escucha el fin del juego y notifica al padre
  const bridgeScript = `
    <script>
      (function() {
        // Observar cambios en el mensaje de fin de juego
        var messageEl = document.getElementById('message');
        var observer = new MutationObserver(function(mutations) {
          var text = messageEl.textContent || '';
          if (text.indexOf('¡Has completado todas las palabras!') !== -1) {
            // Determinar estrellas según el temporizador activo
            var timers = document.querySelectorAll('.timer');
            var stars = 1;
            for (var i = 0; i < timers.length; i++) {
              if (timers[i].style.backgroundColor === 'rgb(255, 215, 0)' || timers[i].style.backgroundColor === '#ffd700') {
                stars = timers.length - i;
                break;
              }
            }
            parent.postMessage({ type: 'sopa-won', stars: stars }, '*');
          } else if (text.indexOf('Se acabó el tiempo') !== -1) {
            parent.postMessage({ type: 'sopa-lost' }, '*');
          }
        });
        if (messageEl) {
          observer.observe(messageEl, { childList: true, subtree: true, characterData: true });
        }
      })();
    </script>
  `;

  const iframeContent = useMemo(() => {
    return pruebaHtml
      .replace(
        /<script\s+src=["']sopa2\.js["']>\s*<\/script>/i,
        `<script>${sopaScript}</script>`,
      )
      .replace('background-color: #f5f5f5;', 'background: transparent;')
      .replace('</body>', `${bridgeScript}</body>`);
  }, [bridgeScript]);

  // Escuchar mensajes del iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'sopa-won') {
        setStars(event.data.stars || 1);
        setGameWon(true);
        setShowSuccess(true);
      } else if (event.data?.type === 'sopa-lost') {
        setGameWon(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow?.document) return;
    try {
      const body = iframe.contentWindow.document.body;
      const height = body.scrollHeight;
      if (height > 0) iframe.style.height = `${height + 20}px`;
    } catch {
      /* srcDoc es same-origin, pero por seguridad */
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen
        bg-gradient-to-br from-rosa-claro via-humo to-beige
        flex flex-col items-center justify-center
        relative overflow-hidden
        px-4 sm:px-6 md:px-8
        py-12
      "
    >
      <Particles count={20} />

      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-display font-bold text-gray-700 mb-6 text-center"
        >
          Un pequeño jueguito antes de tu carta chula...
        </motion.h2>

        <iframe
          ref={iframeRef}
          srcDoc={iframeContent}
          title="Sopa de Letras"
          onLoad={handleIframeLoad}
          className="
            w-full max-w-4xl
            bg-transparent border-0
            rounded-2xl
            overflow-x-auto
          "
          style={{ minHeight: '650px' }}
        />

        {/* Botón deshabilitado hasta ganar el juego */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <AnimatedButton
            onClick={onContinue}
            variant="primary"
            animate={gameWon}
            disabled={!gameWon}
            className="text-lg px-10 py-4"
          >
            {gameWon ? 'Ir a la carta ✉️' : 'Completa el juego para continuar'}
          </AnimatedButton>
          {!gameWon && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-500 italic"
            >
              Encuentra todas las palabras para desbloquear la carta
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Modal de felicitación - reutiliza la animación de CartaSection */}
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
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-800 mb-4">
                ¡Felicidades!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Tu puntaje es de{' '}
                <span className="inline-block text-2xl font-bold text-dorado">
                  {'⭐'.repeat(stars)}
                </span>
              </p>

              {/* Animación de confeti reutilizada */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-6xl mb-6"
              >
                🎉
              </motion.div>

              <AnimatedButton
                onClick={() => setShowSuccess(false)}
                variant="primary"
              >
                Continuar
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
