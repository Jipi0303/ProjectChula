import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
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
 * El único ajuste permitido es el fondo: se hace transparente para que
 * el gradiente romántico de la sección se vea a través del iframe.
 */

interface SopaSectionProps {
  onContinue: () => void;
}

export default function SopaSection({ onContinue }: SopaSectionProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeContent = useMemo(() => {
    return pruebaHtml
      .replace(
        '<script src="sopa2.js"> </script>',
        `<script>${sopaScript}</script>`,
      )
      .replace('background-color: #f5f5f5;', 'background: transparent;');
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
          Un pequeño juego antes de tu carta...
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <AnimatedButton
            onClick={onContinue}
            variant="primary"
            animate={true}
            className="text-lg px-10 py-4"
          >
            Ir a la carta
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rosa-palo/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-beige/30 rounded-full blur-3xl" />
    </motion.section>
  );
}
