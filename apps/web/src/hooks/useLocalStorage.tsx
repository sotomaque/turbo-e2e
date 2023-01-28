import { useEffect, useState } from 'react';

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Retrieve from localStorage
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(item as T);
      }
    }
  }, [key]);

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value as unknown as string);
    }
  };

  const deleteKeyValuePair = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  };

  return {
    storedValue,
    setValue,
    deleteKeyValuePair,
  };
};

export default useLocalStorage;
