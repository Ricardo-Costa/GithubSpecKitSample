import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ThemeProvider } from './theme/theme-provider';
import { initializeThemeMode } from './theme/theme-storage';

const initialThemeMode = initializeThemeMode();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider initialMode={initialThemeMode}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
