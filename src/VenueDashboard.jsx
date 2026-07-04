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
  { id: 'venue-profile', label: 'Venue Profile' },
  { id: 'artists', label: 'Artists' },
  { id: 'bookings', label: 'Bookings' },
];

export default function VenueDashboard() {
  const currentUser = getCurrentUser();
  const [activeView, setActiveView] = useState('dashboard');
  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : 'Venue';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <p className="auth-kicker">Venue Portal</p>
          <h2 className="auth-title dashboard-title">Welcome {currentUser?.name || 'Venue'} {roleLabel}</h2>
        </div>

        <nav className="dashboard-menu" aria-label="Venue dashboard navigation">
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
            <p className="dashboard-empty-state">Venue overview placeholder for upcoming management features.</p>
          </article>
        ) : null}

        {activeView === 'venue-profile' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Venue Profile</h3>
            <p className="dashboard-empty-state">Venue profile placeholder.</p>
          </article>
        ) : null}

        {activeView === 'artists' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Artists</h3>
            <p className="dashboard-empty-state">Artist directory placeholder.</p>
          </article>
        ) : null}

        {activeView === 'bookings' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Bookings</h3>
            <p className="dashboard-empty-state">Bookings placeholder for future booking workflows.</p>
          </article>
        ) : null}
      </section>
    </main>
  );
}
