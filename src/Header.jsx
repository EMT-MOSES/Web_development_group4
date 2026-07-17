const ROUTE_BY_ROLE = {
  artist: '#/artist-dashboard',
  fan: '#/fan-dashboard',
  venue: '#/venue-dashboard',
};

function getCurrentUser() {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading currentUser from localStorage:', error);
    return null;
  }
}

export default function Header() {
  const currentUser = getCurrentUser();
  const dashboardRoute = currentUser ? ROUTE_BY_ROLE[currentUser.role] || '#/' : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  return (
    <header className="site-header">
      <a href="#/" className="brand">StageLink Kenya</a>

      <nav aria-label="Primary navigation" className="nav-links">
        {currentUser ? (
          <>
            <span className="nav-greeting">Hi, {currentUser.name}</span>
            <a className="nav-link" href={dashboardRoute}>
              Dashboard
            </a>
            <button type="button" className="nav-link nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a className="nav-link" href="#/login">
              Log In
            </a>
            <a className="nav-link nav-cta" href="#/signup">
              Sign Up
            </a>
          </>
        )}
      </nav>
    </header>
  );
}
