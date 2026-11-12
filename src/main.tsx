import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Enforce constant light mode across all environments & purge legacy theme data
if (typeof document !== 'undefined') {
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.colorScheme = 'light';
  try {
    localStorage.removeItem('sbh_theme');
    sessionStorage.removeItem('sbh_theme');
  } catch {
    // Ignore storage restriction
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
