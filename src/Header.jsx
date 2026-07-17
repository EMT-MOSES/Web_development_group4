const ROUTE_BY_ROLE = {
  artist: '#/artist-dashboard',
  fan: '#/fan-dashboard',
  venue: '#/venue-dashboard',
};

function getCurrentUser() {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading currentUser from localStorage:', error);
    return null;
  }
}

export default function Header() {
  const currentUser = getCurrentUser();
  const dashboardRoute = currentUser ? ROUTE_BY_ROLE[currentUser.role] || '#/' : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
  };
}

