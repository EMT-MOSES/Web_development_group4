import { useState } from 'react';
import FanArtistDiscovery from './FanArtistDiscovery';
import FanMusicLibrary from './FanMusicLibrary';
import FanVenueDiscovery from './FanVenueDiscovery';

const ARTIST_PROFILES_KEY = 'artistProfiles';
const ARTIST_MUSIC_KEY = 'artistMusic';
const VENUE_PROFILES_KEY = 'venueProfiles';
const BOOKINGS_KEY = 'bookings';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'artists', label: 'Browse Artists' },
  { id: 'venues', label: 'Browse Venues' },
  { id: 'music', label: 'Music Library' },
  { id: 'favorites', label: 'Favorites' },
];

function loadStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export default function FanDashboard() {
  const currentUser = getCurrentUser();
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : 'Fan';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  const totalArtists = loadStoredList(ARTIST_PROFILES_KEY).length;
  const totalVenues = loadStoredList(VENUE_PROFILES_KEY).length;
  const totalSongs = loadStoredList(ARTIST_MUSIC_KEY).length;
  const totalBookings = loadStoredList(BOOKINGS_KEY).length;

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

            <div className="fan-stat-grid">
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Artists</p>
                <h4 className="dashboard-stat-value">{totalArtists}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Venues</p>
                <h4 className="dashboard-stat-value">{totalVenues}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Songs</p>
                <h4 className="dashboard-stat-value">{totalSongs}</h4>
              </div>
              <div className="fan-stat-card">
                <p className="dashboard-label">Total Bookings</p>
                <h4 className="dashboard-stat-value">{totalBookings}</h4>
              </div>
            </div>
          </article>
        ) : null}

        {activeView === 'artists' ? (
          <FanArtistDiscovery selectedArtist={selectedArtist} onSelectArtist={setSelectedArtist} />
        ) : null}

        {activeView === 'venues' ? (
          <FanVenueDiscovery selectedVenue={selectedVenue} onSelectVenue={setSelectedVenue} />
        ) : null}

        {activeView === 'music' ? <FanMusicLibrary /> : null}

        {activeView === 'favorites' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title">Favorites</h3>
            <p className="dashboard-empty-state">Favorites is coming soon.</p>
          </article>
        ) : null}
      </section>
    </main>
  );
}
