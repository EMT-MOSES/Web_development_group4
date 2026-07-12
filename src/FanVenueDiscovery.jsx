const VENUE_PROFILES_KEY = 'venueProfiles';

function loadStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export default function FanVenueDiscovery({ selectedVenue, onSelectVenue }) {
  const venueProfiles = loadStoredList(VENUE_PROFILES_KEY);

  if (venueProfiles.length === 0) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Browse Venues</h3>
        <p className="dashboard-empty-state">No venues available yet.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card">
      <h3 className="dashboard-card-title">Browse Venues</h3>

      <div className="fan-grid">
        {venueProfiles.map((venue) => (
          <div key={venue.userId} className="fan-card">
            <div className="fan-card-image">
              {venue.venueImage ? (
                <img src={venue.venueImage} alt={venue.venueName || 'Venue'} />
              ) : (
                <span>🏟️</span>
              )}
            </div>

            <div className="fan-card-content">
              <p className="dashboard-label">Venue</p>
              <h4>{venue.venueName || 'Untitled Venue'}</h4>
              <p className="dashboard-label">Location</p>
              <p>{venue.location || 'Unknown location'}</p>
              <p className="dashboard-label">Capacity</p>
              <p>{venue.capacity || 'Unknown capacity'}</p>
              <p className="dashboard-label">Supported Genres</p>
              <p>{venue.supportedGenres || 'Not specified'}</p>
              <p className="dashboard-label">Description</p>
              <p>{venue.description || 'No description available yet.'}</p>

              <button className="auth-button" type="button" onClick={() => onSelectVenue(venue)}>
                View Venue
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedVenue ? (
        <div className="dashboard-preview-card fan-profile-layout">
          <div>
            <p className="dashboard-label">Venue Profile</p>
            <h4>{selectedVenue.venueName}</h4>
            <p><strong>Location:</strong> {selectedVenue.location}</p>
            <p><strong>Capacity:</strong> {selectedVenue.capacity}</p>
            <p><strong>Supported Genres:</strong> {selectedVenue.supportedGenres}</p>
            <p><strong>Description:</strong> {selectedVenue.description}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
