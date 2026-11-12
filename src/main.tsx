import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Clean up any lingering theme attributes
if (typeof document !== 'undefined') {
  document.documentElement.removeAttribute('data-theme');
  try {
    localStorage.removeItem('sbh_theme');
  } catch {
    // Ignore
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
