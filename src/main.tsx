// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// On ne met plus AuthProvider ici → plus d'erreur Supabase !

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);