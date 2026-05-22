import { useTheme } from './use-theme';

export const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      className="tm-toggle"
      onClick={toggleMode}
      aria-label={isDark ? 'Desativar modo escuro' : 'Ativar modo escuro'}
      title={isDark ? 'Desativar modo escuro' : 'Ativar modo escuro'}
    >
      {isDark ? '☀️ Modo claro' : '🌙 Modo escuro'}
    </button>
  );
};
