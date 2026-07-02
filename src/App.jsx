import { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Login from './Login';
import Signup from './Signup';
import ArtistDashboard from './ArtistDashboard';
import FanDashboard from './FanDashboard';
import VenueDashboard from './VenueDashboard';

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');

  if (!hash || hash === '/') {
    return 'home';
  }

  return hash;
}

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
    </main>
  );
}
