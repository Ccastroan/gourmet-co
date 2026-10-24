import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Estilos de Bootstrap. Va primero para que mi hoja propia
// (index.css) pueda sobrescribir lo que necesite despues.
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
