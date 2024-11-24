let currentTheme = 'light'; // Тема по умолчанию

export const applyTheme = (theme: string) => {
  const linkId = 'theme-stylesheet';
  const existingLink = document.getElementById(linkId) as HTMLLinkElement | null;

  if (existingLink) {
    existingLink.href = theme === 'dark' ? 'darkTheme.css' : 'lightTheme.css';
  } else {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = theme === 'dark' ? 'darkTheme.css' : 'lightTheme.css';
    document.head.appendChild(link);
  }

  currentTheme = theme;
  localStorage.setItem('theme', theme);
};

export const initTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
};

export const toggleTheme = () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
};