import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Componente de partículas brillantes animadas
 * Genera partículas flotantes que brillan sutilmente en pantalla
 * Se usan para dar efecto mágico/romántico al fondo
 */

interface Particle {
  id: number;
  x: number; // Posición X (porcentaje)
  y: number; // Posición Y (porcentaje)
  size: number; // Tamaño en píxeles
  duration: number; // Duración de la animación
  delay: number; // Retraso antes de iniciar
}

interface ParticlesProps {
  count?: number; // Número de partículas (default: 20)
}

export default function Particles({ count = 20 }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generar partículas con posiciones y propiedades aleatorias
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // 0-100% del ancho
        y: Math.random() * 100, // 0-100% del alto
        size: Math.random() * 6 + 3, // Tamaño entre 3-9px
        duration: Math.random() * 2 + 2, // Duración 2-4s
        delay: Math.random() * 2, // Retraso 0-2s
      });
    }
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            // Sombra suave para efecto de brillo
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
          // Animación de brillo infinita
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
