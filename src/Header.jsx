export default function Header({ theme, onToggleTheme }) {
  const isLight = theme === 'light';

  return (
    <header className="site-header">
      <div className="brand">Artist Platform</div>
      <nav aria-label="Primary navigation" className="nav-links">
        <a href="#/login" aria-label="Go to login page">
          Log In
        </a>
        <a href="#/signup" aria-label="Go to signup page">
          Sign Up
        </a>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {isLight ? '🌙' : '☀️'}
          </span>
          {isLight ? 'Dark mode' : 'Light mode'}
        </button>
      </nav>
    </header>
  );
}
