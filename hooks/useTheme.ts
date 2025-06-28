import { useEffect, useState } from 'react';

// Global state management
let globalDarkMode = true;
let listeners: ((dark: boolean) => void)[] = [];

// Initialize theme on app start
if (typeof document !== 'undefined') {
  // Check if user has a saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    globalDarkMode = savedTheme === 'dark';
  }
  
  // Apply initial theme
  if (globalDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(globalDarkMode);

  useEffect(() => {
    const listener = (dark: boolean) => setIsDarkMode(dark);
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const setDarkMode = (dark: boolean) => {
    globalDarkMode = dark;
    listeners.forEach(listener => listener(dark));
    
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
    
    // Apply to document for web
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleDarkMode = () => setDarkMode(!isDarkMode);

  return { isDarkMode, setDarkMode, toggleDarkMode };
} 