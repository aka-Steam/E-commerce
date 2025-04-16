import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime';

import { initTheme } from 'utils/theme';
import 'styles/index.scss';
import 'configs/configureMobX.ts';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';

initTheme(); // Инициализация темы при загрузке приложения

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
