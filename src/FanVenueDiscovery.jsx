import { useEffect, useMemo, useState } from 'react';
import { filterAndSortVenues } from './utils/searchUtils';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [capacityFilter, setCapacityFilter] = useState('All');
  const [sortValue, setSortValue] = useState('alphabetical');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const locationOptions = useMemo(() => {
    const discovered = new Set(['All Locations']);
    venueProfiles.forEach((venue) => {
      if (venue.location) {
        discovered.add(venue.location);
      }
    });

    return Array.from(discovered);
  }, [venueProfiles]);

  const filteredVenues = useMemo(
    () => filterAndSortVenues(venueProfiles, searchTerm, locationFilter, capacityFilter, sortValue),
    [venueProfiles, searchTerm, locationFilter, capacityFilter, sortValue],
  );

  if (loading) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Browse Venues</h3>
        <p className="dashboard-empty-state">Loading venues...</p>
      </article>
    );
  }

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

      <div className="search-controls">
        <input
          className="dashboard-input"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search venues by name, location, or genre"
        />

        <select className="dashboard-input" value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select className="dashboard-input" value={capacityFilter} onChange={(event) => setCapacityFilter(event.target.value)}>
          <option value="All">All Capacity</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <select className="dashboard-input" value={sortValue} onChange={(event) => setSortValue(event.target.value)}>
          <option value="alphabetical">Alphabetical</option>
          <option value="capacity">Capacity</option>
        </select>
      </div>

      {filteredVenues.length === 0 ? (
        <p className="dashboard-empty-state">No venues found.</p>
      ) : (
        <div className="fan-grid">
          {filteredVenues.map((venue) => (
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
      )}

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
