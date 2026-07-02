export default function Header() {
  return (
    <header className="site-header">
      <div className="brand">Artist Platform</div>
      <nav aria-label="Primary navigation" className="nav-links">
        <a href="#/login">Log In</a>
        <a href="#/signup">Sign Up</a>
      </nav>
    </header>
  );
}
