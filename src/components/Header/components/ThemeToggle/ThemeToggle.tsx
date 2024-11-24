import * as React from 'react';
import { toggleTheme, initTheme } from 'utils/theme';

initTheme(); // Инициализация темы при загрузке

const ThemeToggle: React.FC = () => {
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;