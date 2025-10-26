import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './sections/WelcomeScreen';
import DetalleSection from './sections/DetalleSection';
import CartaSection from './sections/CartaSection';
import SidePanel from './components/SidePanel';
import content from './content.json';

/**
 * Componente principal de la aplicación "Carta para Ella"
 *
 * Flujo de navegación:
 * 1. WelcomeScreen - Pantalla inicial con mensaje typewriter
 * 2. DetalleSection - Sección "El detalle" con mensaje dulce
 * 3. CartaSection - Carta principal con sobre interactivo y botones Sí/No
 *
 * El panel lateral está siempre disponible para funciones futuras
 */

function App() {
  // Control de la sección actual (0: welcome, 1: detalle, 2: carta)
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Panel lateral de novedades - siempre visible */}
      <SidePanel items={content.panel.items} />

      {/* Renderizado condicional de secciones con animaciones */}
      <AnimatePresence mode="wait">
        {/* Sección 0: Bienvenida */}
        {currentSection === 0 && (
          <WelcomeScreen
            key="welcome"
            text={content.welcome.text}
            buttonText={content.welcome.buttonText}
            onContinue={() => setCurrentSection(1)}
          />
        )}

        {/* Sección 1: El detalle */}
        {currentSection === 1 && (
          <DetalleSection
            key="detalle"
            title={content.detalle.title}
            text={content.detalle.text}
            buttonText={content.detalle.buttonText}
            onContinue={() => setCurrentSection(2)}
          />
        )}

        {/* Sección 2: Carta principal */}
        {currentSection === 2 && (
          <CartaSection
            key="carta"
            message={content.carta.message}
            yesButton={content.carta.yesButton}
            noButton={content.carta.noButton}
            successMessage={content.carta.successMessage}
            successGif="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXJtNmR5ZHI3OHZtZnhpYWd2bzF5dTJxeWd6MzBvdmJqZXZ3bWs3ZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/111ebonMs90YLu/giphy.gif"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
