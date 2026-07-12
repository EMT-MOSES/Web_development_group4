import { useMemo, useState } from 'react';
import ArtistAnalytics from './ArtistAnalytics';
import ArtistProfile from './ArtistProfile';
import MusicManager from './MusicManager';

const ARTIST_MUSIC_KEY = 'artistMusic';
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

  const totalSongs = useMemo(() => loadStoredList(ARTIST_MUSIC_KEY).filter((song) => song.artistId === currentUser?.id).length, [currentUser]);
  const bookings = useMemo(() => loadStoredList(BOOKINGS_KEY).filter((booking) => booking.artistId === currentUser?.id), [currentUser]);
  const pendingBookings = bookings.filter((booking) => booking.status === 'Pending').length;
  const acceptedBookings = bookings.filter((booking) => booking.status === 'Accepted').length;

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

            <div className="fan-stat-grid">
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Songs</p>
                <h4 className="dashboard-stat-value">{totalSongs}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Pending Bookings</p>
                <h4 className="dashboard-stat-value">{pendingBookings}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Accepted Bookings</p>
                <h4 className="dashboard-stat-value">{acceptedBookings}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Profile Views</p>
                <h4 className="dashboard-stat-value">{Math.max(1, totalSongs + pendingBookings + acceptedBookings)}</h4>
              </div>
            </div>
          </article>
        ) : null}

        {activeView === 'profile' ? <ArtistProfile /> : null}

        {activeView === 'music' ? <MusicManager /> : null}

        {activeView === 'analytics' ? <ArtistAnalytics /> : null}
      </section>
    </main>
  );
}
