import { useState } from 'react';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'artists', label: 'Artists' },
  { id: 'venues', label: 'Venues' },
  { id: 'favorites', label: 'Favorites' },
];

export default function FanDashboard() {
  const currentUser = getCurrentUser();
  const [activeView, setActiveView] = useState('dashboard');
  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : 'Fan';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <p className="auth-kicker">Fan Portal</p>
          <h2 className="auth-title dashboard-title">Welcome {currentUser?.name || 'Fan'} {roleLabel}</h2>
        </div>

        <nav className="dashboard-menu" aria-label="Fan dashboard navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`dashboard-menu-item ${activeView === item.id ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="auth-button dashboard-logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="dashboard-content">
        {activeView === 'dashboard' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Dashboard</h3>
            <p className="dashboard-empty-state">Fan overview placeholder for upcoming feature discovery.</p>
          </article>
        ) : null}

        {activeView === 'artists' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Artists</h3>
            <p className="dashboard-empty-state">Artist discovery placeholder.</p>
          </article>
        ) : null}

        {activeView === 'venues' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Venues</h3>
            <p className="dashboard-empty-state">Venue listing placeholder.</p>
          </article>
        ) : null}

        {activeView === 'favorites' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Favorites</h3>
            <p className="dashboard-empty-state">Favorites placeholder for future saved content.</p>
          </article>
        ) : null}
      </section>
    </main>
  );
}
