import { useState, useEffect } from 'react';

// Создаем кастомное событие для оповещения об изменениях в localStorage
export const LOCAL_STORAGE_CHANGE_EVENT = 'onLocalStorageChange';

// Функция для отправки события об изменении localStorage
export const dispatchStorageEvent = (key: string, newValue: string) => {
  // console.log('Dispatching storage event:', { key, newValue });
  window.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT, {
      detail: { key, newValue },
    }),
  );
};

// Хук для работы с localStorage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Получаем начальное значение
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      // console.log('Getting initial value for', key, ':', item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Функция для установки значения в localStorage
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      const stringValue = JSON.stringify(valueToStore);
      localStorage.setItem(key, stringValue);
      // console.log('Setting new value for', key, ':', stringValue);

      // Отправляем событие об изменении
      dispatchStorageEvent(key, stringValue);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  // Слушаем изменения в localStorage
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent<{ key: string; newValue: string }>) => {
      if (e.detail.key === key) {
        // console.log('Received storage event for', key, ':', e.detail.newValue);
        setStoredValue(JSON.parse(e.detail.newValue));
      }
    };

    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleStorageChange as EventListener);
    // console.log('Added storage event listener for', key);

    return () => {
      window.removeEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleStorageChange as EventListener);
      // console.log('Removed storage event listener for', key);
    };
  }, [key]);

  return [storedValue, setValue] as const;
};