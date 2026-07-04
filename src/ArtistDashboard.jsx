import { useState } from 'react';
import ArtistProfile from './ArtistProfile';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'profile', label: 'My Profile' },
  { id: 'music', label: 'My Music' },
  { id: 'analytics', label: 'Analytics' },
];

export default function ArtistDashboard() {
  const currentUser = getCurrentUser();
  const [activeView, setActiveView] = useState('profile');
  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : 'Artist';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <p className="auth-kicker">Artist Portal</p>
          <h2 className="auth-title dashboard-title">Welcome {currentUser?.name || 'Artist'} {roleLabel}</h2>
        </div>

        <nav className="dashboard-menu" aria-label="Artist dashboard navigation">
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
            <p className="dashboard-empty-state">Artist overview placeholder for future insights and actions.</p>
          </article>
        ) : null}

        {activeView === 'profile' ? <ArtistProfile /> : null}

        {activeView === 'music' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">My Music</h3>
            <p className="dashboard-empty-state">Music management is coming soon.</p>
          </article>
        ) : null}

        {activeView === 'analytics' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Analytics</h3>
            <p className="dashboard-empty-state">Analytics placeholder for future reporting.</p>
          </article>
        ) : null}
      </section>
    </main>
  );
}
