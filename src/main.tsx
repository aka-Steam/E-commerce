import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime'
import 'styles/index.scss';
import 'configs/configureMobX.ts';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

if(import.meta.webpackHot){
  import.meta.webpackHot.accept();
}
