export default function Header() {
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
      </nav>
    </header>
  );
}
