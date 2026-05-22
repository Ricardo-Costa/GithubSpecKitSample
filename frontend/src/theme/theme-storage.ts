import { THEME_MODES, THEME_STORAGE_KEY, type ThemeMode } from './theme-types';

export const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === 'string' && THEME_MODES.includes(value as ThemeMode);

export const applyThemeModeToDocument = (mode: ThemeMode) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', mode === 'dark');
};

export const readStoredThemeMode = (): ThemeMode | null => {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!value || !isThemeMode(value)) {
      return null;
    }

    return value;
  } catch {
    return null;
  }
};

export const writeStoredThemeMode = (mode: ThemeMode) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Storage access can fail in restrictive environments; UI keeps working in memory.
  }
};

export const resolveInitialThemeMode = (): ThemeMode => readStoredThemeMode() ?? 'light';

export const initializeThemeMode = (): ThemeMode => {
  const mode = resolveInitialThemeMode();
  applyThemeModeToDocument(mode);
  return mode;
};
