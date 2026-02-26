'use client';

import { useEffect } from 'react';

export default function SecurityProvider({ children }) {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. Disable Keyboard Shortcuts (Inspect, View Source, etc)
    const handleKeyDown = (e) => {
      // Disable F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
