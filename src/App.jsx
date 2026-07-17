import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import Login from './Login';
import Signup from './Signup';
import ArtistDashboard from './ArtistDashboard';
import FanDashboard from './FanDashboard';
import VenueDashboard from './VenueDashboard';

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = hash.split('?')[0];

  if (!path || path === '/') {
    return 'home';
  }

  return path;
}

// --- AUTH HELPERS ---
function getCurrentUser() {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading currentUser from localStorage:', error);
    return null;
  }
}

// Maps a role to the dashboard route it owns
const ROLE_DASHBOARD_ROUTE = {
  artist: 'artist-dashboard',
  fan: 'fan-dashboard',
  venue: 'venue-dashboard',
};

// Routes that require a logged-in user
const PROTECTED_ROUTES = ['artist-dashboard', 'fan-dashboard', 'venue-dashboard'];

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // --- ROUTE PROTECTION ---
  // Runs whenever the route changes. Kicks unauthenticated users back to
  // login, and kicks users to their OWN dashboard if they try to visit
  // someone else's (e.g. a fan hitting #/artist-dashboard).
  useEffect(() => {
    if (!PROTECTED_ROUTES.includes(route)) return;

    const user = getCurrentUser();

    if (!user) {
      window.location.hash = '#/login';
      return;
    }

    const ownRoute = ROLE_DASHBOARD_ROUTE[user.role];

    if (route !== ownRoute) {
      window.location.hash = `#/${ownRoute || 'login'}`;
    }
  }, [route]);

  let content = <Hero />;

  if (route === 'login') {
    content = <Login />;
  } else if (route === 'signup') {
    content = <Signup />;
  } else if (route === 'artist-dashboard') {
    content = <ArtistDashboard />;
  } else if (route === 'fan-dashboard') {
    content = <FanDashboard />;
  } else if (route === 'venue-dashboard') {
    content = <VenueDashboard />;
  }

  return (
    <main>
      <Header />
      {content}
      <Footer />
    </main>
  );
}