import { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Login from './Login';
import Signup from './Signup';
import ArtistDashboard from './ArtistDashboard';
import FanDashboard from './FanDashboard';
import VenueDashboard from './VenueDashboard';
import Footer from './Footer';

const THEME_STORAGE_KEY = 'artist-platform-theme';

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');

  if (!hash || hash === '/') {
    return 'home';
  }

  return hash;
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRoute());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

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
    <>
      <main>
        <Header theme={theme} onToggleTheme={toggleTheme} />
        {content}
      </main>
      <Footer />
    </>
  );
}
