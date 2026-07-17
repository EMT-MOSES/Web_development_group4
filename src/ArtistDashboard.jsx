import { useMemo, useState, useEffect } from 'react';
import ArtistAnalytics from './ArtistAnalytics';
import ArtistProfile from './ArtistProfile';
import MusicManager from './MusicManager';

const ARTIST_MUSIC_KEY = 'artistMusic';
const BOOKINGS_KEY = 'bookings';

// --- CRASH PREVENTION UTILITIES ---
function getCurrentUser() {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error reading currentUser from localStorage:", error);
    return null;
  }
}

function loadStoredList(key) {
  try {
    const list = localStorage.getItem(key);
    return list ? JSON.parse(list) : [];
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
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
  
  // 1. Default to 'dashboard' so users immediately see your interactive stats & preview card!
  const [activeView, setActiveView] = useState('dashboard');
  
  // 2. Refresh State: This forces React to re-calculate localStorage data when navigating back to the dashboard
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    // Every time the user clicks a tab, we increment dataVersion to pull fresh localStorage data safely
    setDataVersion(prev => prev + 1);
  }, [activeView]);

  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
    : 'Artist';

  // --- SAFE CALCULATED STATS (using dataVersion to guarantee fresh values) ---
  const totalSongs = useMemo(() => {
    return loadStoredList(ARTIST_MUSIC_KEY).filter((song) => song.artistId === currentUser?.id).length;
  }, [currentUser, dataVersion]);

  const bookings = useMemo(() => {
    return loadStoredList(BOOKINGS_KEY).filter((booking) => booking.artistId === currentUser?.id);
  }, [currentUser, dataVersion]);

  const pendingBookings = bookings.filter((booking) => booking.status === 'Pending').length;
  const acceptedBookings = bookings.filter((booking) => booking.status === 'Accepted').length;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };

  return (
    <main className="dashboard-page" style={{ background: '#0a0512', color: '#fff', minHeight: '100vh', display: 'flex' }}>
      
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)', padding: '20px' }}>
        <div className="dashboard-sidebar-header">
          <p className="auth-kicker" style={{ color: '#ff3366', fontWeight: 'bold', margin: 0 }}>Artist Portal</p>
          <h2 className="auth-title dashboard-title" style={{ fontSize: '1.2rem', margin: '10px 0' }}>
            Welcome, {currentUser?.name || 'Artist'} <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({roleLabel})</span>
          </h2>
        </div>

        <nav className="dashboard-menu" aria-label="Artist dashboard navigation" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`dashboard-menu-item ${activeView === item.id ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveView(item.id)}
              style={{
                textAlign: 'left',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: activeView === item.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: activeView === item.id ? '#fff' : '#aaa',
                cursor: 'pointer',
                fontWeight: activeView === item.id ? 'bold' : 'normal',
                transition: '0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          className="auth-button dashboard-logout" 
          type="button" 
          onClick={handleLogout}
          style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #ff3366', color: '#ff3366', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="dashboard-content" style={{ flex: 1, padding: '40px' }}>
        
        {activeView === 'dashboard' ? (
          <article className="dashboard-card">
            <h3 className="dashboard-card-title" style={{ fontSize: '2rem', marginBottom: '20px', letterSpacing: '-1px' }}>
              My Dashboard
            </h3>

            {/* Split layout: Stats on the left, Dynamic interactive card on the right */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'start' }}>
              
              {/* Stats Grid */}
              <div className="fan-stat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="fan-stat-card" style={glassCardStyle}>
                  <p className="dashboard-label" style={{ color: '#aaa', margin: 0 }}>Total Songs</p>
                  <h4 className="dashboard-stat-value" style={{ fontSize: '2.5rem', margin: '10px 0' }}>{totalSongs}</h4>
                </div>
                <div className="fan-stat-card" style={glassCardStyle}>
                  <p className="dashboard-label" style={{ color: '#aaa', margin: 0 }}>Pending Bookings</p>
                  <h4 className="dashboard-stat-value" style={{ fontSize: '2.5rem', margin: '10px 0', color: '#ffb703' }}>{pendingBookings}</h4>
                </div>
                <div className="fan-stat-card" style={glassCardStyle}>
                  <p className="dashboard-label" style={{ color: '#aaa', margin: 0 }}>Accepted Bookings</p>
                  <h4 className="dashboard-stat-value" style={{ fontSize: '2.5rem', margin: '10px 0', color: '#2ec4b6' }}>{acceptedBookings}</h4>
                </div>
                <div className="fan-stat-card" style={glassCardStyle}>
                  <p className="dashboard-label" style={{ color: '#aaa', margin: 0 }}>Profile Reach</p>
                  <h4 className="dashboard-stat-value" style={{ fontSize: '2.5rem', margin: '10px 0' }}>
                    {Math.max(1, totalSongs + pendingBookings + acceptedBookings) * 12} views
                  </h4>
                </div>
              </div>

              {/* Dynamic Interactive Preview Card (Ref. Image 2 style) */}
              <div style={premiumCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffb703', letterSpacing: '1px' }}>🔥 TRENDING PROFILE</span>
                  <span style={{ background: '#ff3366', padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>
                    ● LIVE PREVIEW
                  </span>
                </div>

                <div style={{ margin: '25px 0 15px 0', display: 'flex', gap: '15px', alignItems: 'center' }}>
                  {/* Decorative Profile Gradient Image Circle */}
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #8a2be2, #ff007b)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    🎵
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{currentUser?.name || 'Your Stage Name'}</h4>
                    <p style={{ margin: '4px 0 0 0', color: '#aaa', fontSize: '12px' }}>{roleLabel} • Active now</p>
                  </div>
                </div>

                {/* Audio waves visualizer lookalike */}
                <div style={{ display: 'flex', gap: '4px', height: '24px', alignItems: 'center', margin: '15px 0' }}>
                  <div style={{ ...waveBar, height: '12px', animationDelay: '0.1s' }} />
                  <div style={{ ...waveBar, height: '20px', animationDelay: '0.3s' }} />
                  <div style={{ ...waveBar, height: '8px', animationDelay: '0.5s' }} />
                  <div style={{ ...waveBar, height: '24px', animationDelay: '0.2s' }} />
                  <div style={{ ...waveBar, height: '14px', animationDelay: '0.4s' }} />
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '15px 0' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: '#aaa' }}>Active Music</span>
                    <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: 'bold' }}>{totalSongs} Tracks</p>
                  </div>
                  <div>
                    <span style={{ color: '#aaa' }}>Bookings</span>
                    <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: 'bold' }}>{acceptedBookings} Approved</p>
                  </div>
                </div>
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

// --- CSS-in-JS STYLES FOR SLEEK DESIGN ---
const glassCardStyle = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  padding: '20px',
  transition: 'transform 0.2s ease',
};

const premiumCardStyle = {
  background: 'linear-gradient(145deg, rgba(30, 15, 50, 0.9), rgba(15, 8, 30, 0.95))',
  border: '1px solid rgba(138, 43, 226, 0.25)',
  borderRadius: '20px',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

const waveBar = {
  width: '3px',
  background: '#8a2be2',
  borderRadius: '2px',
};