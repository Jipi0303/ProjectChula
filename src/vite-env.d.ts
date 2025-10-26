/// <reference types="vite/client" />

// Declaración de tipo para importar archivos JSON
declare module '*.json' {
  const value: any;
  export default value;
}
