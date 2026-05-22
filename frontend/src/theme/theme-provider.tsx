import { createContext, useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import {
  applyThemeModeToDocument,
  resolveInitialThemeMode,
  writeStoredThemeMode
} from './theme-storage';
import { type ThemeMode } from './theme-types';

export interface ThemeContextValue {
  mode: ThemeMode;
  isHydrated: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps extends PropsWithChildren {
  initialMode?: ThemeMode;
}

export const ThemeProvider = ({ children, initialMode }: ThemeProviderProps) => {
  // Contract: storage key `task-management.theme.mode`, fallback mode `light`.
  const [mode, setModeState] = useState<ThemeMode>(initialMode ?? resolveInitialThemeMode());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    applyThemeModeToDocument(mode);
    writeStoredThemeMode(mode);
    setIsHydrated(true);
  }, [mode]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isHydrated,
      setMode,
      toggleMode
    }),
    [isHydrated, mode, setMode, toggleMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
