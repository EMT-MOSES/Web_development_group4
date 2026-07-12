import { useMemo, useState } from 'react';

const ARTIST_PROFILES_KEY = 'artistProfiles';
const BOOKINGS_KEY = 'bookings';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

function loadStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
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

  const bookings = useMemo(() => loadStoredList(BOOKINGS_KEY).filter((booking) => booking.venueId === currentUser?.id), [currentUser]);
  const totalArtists = loadStoredList(ARTIST_PROFILES_KEY).length;
  const activeBookings = bookings.filter((booking) => booking.status === 'Pending' || booking.status === 'Accepted').length;
  const upcomingEvents = bookings.filter((booking) => booking.eventDate).length;
  const totalCapacity = bookings.reduce((total, booking) => total + (Number(booking.offeredFee) || 0), 0);

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

            <div className="fan-stat-grid">
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Artists</p>
                <h4 className="dashboard-stat-value">{totalArtists}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Active Bookings</p>
                <h4 className="dashboard-stat-value">{activeBookings}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Upcoming Events</p>
                <h4 className="dashboard-stat-value">{upcomingEvents}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Capacity</p>
                <h4 className="dashboard-stat-value">{totalCapacity}</h4>
              </div>
            </div>
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
