import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Mail, Heart, Music, Lock } from 'lucide-react';

/**
 * Panel lateral de novedades y futuras funcionalidades
 * Se desliza desde la derecha con un botón flotante
 * Muestra opciones para funciones futuras del sitio
 */

interface PanelItem {
  icon: string; // Nombre del icono
  text: string; // Texto descriptivo
  available: boolean; // Si está disponible o próximamente
}

interface SidePanelProps {
  items: PanelItem[]; // Lista de items del panel
}

// Mapeo de nombres de iconos a componentes
const iconMap = {
  mail: Mail,
  heart: Heart,
  music: Music,
  lock: Lock,
};

export default function SidePanel({ items }: SidePanelProps) {
  const [isOpen, setIsOpen] = useState(false); // Estado de apertura del panel

  // Alternar apertura/cierre del panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante para abrir el panel */}
      <motion.button
        onClick={togglePanel}
        className="
          fixed top-6 right-6 z-50
          bg-rosa-palo hover:bg-rosa-suave
          rounded-full
          w-12 h-12 sm:w-14 sm:h-14
          flex items-center justify-center
          shadow-lg
          transition-colors duration-300
        "
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </motion.button>

      {/* Panel deslizante */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay oscuro de fondo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={togglePanel}
            />

            {/* Panel con contenido */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="
                fixed top-0 right-0 h-full
                w-80 sm:w-96
                bg-gradient-to-br from-rosa-claro to-beige
                shadow-2xl
                z-50
                overflow-y-auto
              "
            >
              {/* Contenido del panel */}
              <div className="p-8 pt-20">
                {/* Título */}
                <h2 className="text-3xl font-display font-bold text-gray-800 mb-8 text-center">
                  Novedades
                </h2>

                {/* Lista de items */}
                <div className="space-y-4">
                  {items.map((item, index) => {
                    // Obtener el componente de icono correspondiente
                    const IconComponent = iconMap[item.icon as keyof typeof iconMap];

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          flex items-center gap-4
                          p-4 rounded-xl
                          ${
                            item.available
                              ? 'bg-white/80 hover:bg-white cursor-pointer'
                              : 'bg-white/40 cursor-not-allowed'
                          }
                          transition-all duration-300
                          shadow-md
                        `}
                      >
                        {/* Icono */}
                        <div
                          className={`
                          w-10 h-10 rounded-full
                          flex items-center justify-center
                          ${item.available ? 'bg-rosa-palo' : 'bg-gray-300'}
                        `}
                        >
                          {IconComponent && (
                            <IconComponent
                              className={`w-5 h-5 ${
                                item.available ? 'text-gray-700' : 'text-gray-500'
                              }`}
                            />
                          )}
                        </div>

                        {/* Texto */}
                        <div className="flex-1">
                          <p className="font-body font-medium text-gray-800">
                            {item.text}
                          </p>
                          {!item.available && (
                            <p className="text-xs text-gray-500 mt-1">Próximamente...</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mensaje especial al final */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-4 bg-white/60 rounded-xl text-center"
                >
                  <p className="text-sm text-gray-600 font-body italic">
                    Future appointments or plans...
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
