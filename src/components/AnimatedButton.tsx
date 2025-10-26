import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Componente de botón animado reutilizable
 * Características:
 * - Animación de latido (heartbeat) opcional
 * - Efectos hover y tap suaves
 * - Estilos personalizables
 * - Totalmente responsive
 */

interface AnimatedButtonProps {
  children: ReactNode; // Contenido del botón (texto, iconos, etc.)
  onClick?: () => void; // Función al hacer clic
  variant?: 'primary' | 'secondary' | 'danger'; // Variante de estilo
  animate?: boolean; // Si debe tener animación de latido
  className?: string; // Clases adicionales de Tailwind
  disabled?: boolean; // Estado deshabilitado
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  animate = false,
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  // Definir colores según la variante
  const variantStyles = {
    primary: 'bg-rosa-palo hover:bg-rosa-suave text-gray-800',
    secondary: 'bg-beige hover:bg-beige-oscuro text-gray-700',
    danger: 'bg-gray-300 hover:bg-gray-400 text-gray-600',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      // Animación de latido continuo si animate=true
      animate={animate ? { scale: [1, 1.05, 1, 1.05, 1] } : {}}
      transition={{
        duration: 1.5,
        repeat: animate ? Infinity : 0,
        ease: 'easeInOut',
      }}
      // Efectos hover: levanta y agranda ligeramente
      whileHover={{
        scale: 1.08,
        y: -3,
        transition: { duration: 0.2 },
      }}
      // Efecto tap: se hunde ligeramente
      whileTap={{ scale: 0.95 }}
      className={`
        ${variantStyles[variant]}
        px-8 py-3
        rounded-full
        font-body font-medium
        shadow-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        text-sm sm:text-base
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
