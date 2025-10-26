import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente de efecto máquina de escribir (typewriter)
 * Anima el texto letra por letra con cursor parpadeante
 * Ideal para efectos dramáticos y llamar la atención
 */

interface TypeWriterProps {
  text: string; // Texto a animar
  speed?: number; // Velocidad en ms por letra (default: 50)
  onComplete?: () => void; // Callback cuando termina de escribir
  className?: string; // Clases CSS adicionales
}

export default function TypeWriter({
  text,
  speed = 50,
  onComplete,
  className = '',
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState(''); // Texto mostrado actualmente
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la letra actual
  const [isComplete, setIsComplete] = useState(false); // Si terminó la animación

  useEffect(() => {
    // Si ya mostramos todo el texto, marcar como completo
    if (currentIndex >= text.length) {
      setIsComplete(true);
      if (onComplete) {
        // Llamar al callback después de medio segundo
        setTimeout(onComplete, 500);
      }
      return;
    }

    // Timer para agregar la siguiente letra
    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    // Limpiar el timer al desmontar
    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Texto que se va mostrando */}
      <span className="whitespace-pre-wrap">{displayedText}</span>

      {/* Cursor parpadeante - solo visible mientras escribe */}
      {!isComplete && (
        <motion.span
          className="inline-block w-1 h-6 sm:h-8 bg-gray-800 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
}
