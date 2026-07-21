import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Particles from '../components/Particles';
import AnimatedButton from '../components/AnimatedButton';
import sopaScript from '../components/sopa2.js?raw';

/**
 * Sección "Sopa de Letras"
 * Integra el juego de sopa de letras tal cual fue provisto,
 * envuelto en un fondo romántico que combina con el resto del sitio.
 */

interface SopaSectionProps {
  onContinue: () => void;
}

export default function SopaSection({ onContinue }: SopaSectionProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Inyecta el script del juego tal cual, sin modificarlo
    const script = document.createElement('script');
    script.textContent = sopaScript;
    document.body.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

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
        {/* Contenedor del juego - estructura HTML intacta del archivo original */}
        <div className="container" style={{ display: 'flex', maxWidth: '1000px', background: 'white', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <div className="left-section" style={{ padding: '20px', borderRight: '1px solid #ddd' }}>
            <div className="title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Sopa de Letras</div>
            <p className="message" id="message" style={{ fontSize: '16px', marginBottom: '20px', color: '#555' }}>Encuentra todas las palabras antes de que se acabe el tiempo. ¡Buena suerte!</p>
            <div className="timers" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div className="timer" id="timer1" style={{ fontSize: '18px', fontWeight: 'bold', background: '#eee', padding: '10px', borderRadius: '5px' }}>3:00 ⭐⭐⭐</div>
              <div className="timer" id="timer2" style={{ fontSize: '18px', fontWeight: 'bold', background: '#eee', padding: '10px', borderRadius: '5px' }}>4:00 ⭐⭐</div>
              <div className="timer" id="timer3" style={{ fontSize: '18px', fontWeight: 'bold', background: '#eee', padding: '10px', borderRadius: '5px' }}>7:00 ⭐</div>
            </div>
            <div className="grid" id="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 30px)', gap: '2px', marginBottom: '20px' }}></div>
            <div className="end-buttons" id="end-buttons" style={{ display: 'none', flexDirection: 'column', gap: '10px' }}>
              <button className="button" id="restart-button" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Reiniciar</button>
              <button className="button" id="next-button" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Siguiente Juego</button>
            </div>
          </div>
          <div className="right-section" style={{ padding: '20px', backgroundColor: '#f9f9f9', flex: 1 }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Palabras a encontrar</h3>
            <ul className="words-list" id="words-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}></ul>
          </div>
        </div>

        {/* Botón para continuar a la carta */}
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
            Ir a la carta ✉️
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rosa-palo/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-beige/30 rounded-full blur-3xl" />
    </motion.section>
  );
}
