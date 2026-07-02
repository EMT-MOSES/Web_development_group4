function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

export default function ArtistDashboard() {
  const currentUser = getCurrentUser();
  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : 'Artist';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-kicker">Dashboard</p>
          <h2 className="auth-title">Welcome {currentUser?.name || 'Artist'} {roleLabel}</h2>
        </div>

        <button className="auth-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}
