'use client';

import { useEffect } from 'react';

export default function ConsoleSuppressor() {
  useEffect(() => {
    // Save original console.warn
    const originalWarn = console.warn;
    
    // Override console.warn to filter out the specific THREE.Clock warning
    console.warn = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
