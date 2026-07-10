import { useMemo } from 'react';

const ARTIST_MUSIC_KEY = 'artistMusic';
const ARTIST_PROFILES_KEY = 'artistProfiles';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

function loadArtistProfiles() {
  try {
    return JSON.parse(localStorage.getItem(ARTIST_PROFILES_KEY)) || [];
  } catch {
    return [];
  }
}

function loadArtistMusic() {
  try {
    return JSON.parse(localStorage.getItem(ARTIST_MUSIC_KEY)) || [];
  } catch {
    return [];
  }
}

export default function ArtistAnalytics() {
  const currentUser = useMemo(() => getCurrentUser(), []);

  const profile = useMemo(() => {
    if (!currentUser?.id) {
      return null;
    }

    const profiles = loadArtistProfiles();
    return profiles.find((entry) => entry.userId === currentUser.id) || null;
  }, [currentUser]);

  const songs = useMemo(() => {
    if (!currentUser?.id) {
      return [];
    }

    const music = loadArtistMusic();
    return music.filter((song) => song.artistId === currentUser.id);
  }, [currentUser]);

  const profileCompletion = useMemo(() => {
    if (!profile) {
      return 0;
    }

    const requiredFields = [
      profile.stageName,
      profile.genre,
      profile.bio,
      profile.location,
      profile.website,
    ];

    const filledFields = requiredFields.filter(Boolean).length;
    return Math.round((filledFields / requiredFields.length) * 100);
  }, [profile]);

  const genreSummary = useMemo(() => {
    const counts = songs.reduce((accumulator, song) => {
      const genre = song.genre?.trim() || 'Uncategorized';
      accumulator[genre] = (accumulator[genre] || 0) + 1;
      return accumulator;
    }, {});

    return Object.entries(counts).sort((left, right) => right[1] - left[1]);
  }, [songs]);

  if (!currentUser) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Analytics</h3>
        <p className="dashboard-empty-state">Please log in to view your artist analytics.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card">
      <h3 className="dashboard-card-title">Analytics</h3>

      <div className="dashboard-profile-layout">
        <div className="dashboard-form">
          <div className="dashboard-form-grid">
            <label className="dashboard-field">
              <span className="dashboard-label">Profile Progress</span>
              <p className="dashboard-empty-state">{profileCompletion}% complete</p>
            </label>

            <label className="dashboard-field">
              <span className="dashboard-label">Total Songs</span>
              <p className="dashboard-empty-state">{songs.length}</p>
            </label>

            <label className="dashboard-field">
              <span className="dashboard-label">Top Genre</span>
              <p className="dashboard-empty-state">
                {genreSummary[0]?.[0] || 'No genre activity yet'}
              </p>
            </label>

            <label className="dashboard-field">
              <span className="dashboard-label">Profile Status</span>
              <p className="dashboard-empty-state">
                {profile ? 'Profile saved locally' : 'Complete your profile to improve visibility'}
              </p>
            </label>
          </div>
        </div>

        <div className="dashboard-preview-card">
          <p className="dashboard-label">Genre Breakdown</p>
          {genreSummary.length === 0 ? (
            <p className="dashboard-empty-state">Add songs to see your release distribution.</p>
          ) : (
            <div className="dashboard-profile-preview">
              {genreSummary.map(([genre, count]) => (
                <div key={genre}>
                  <p className="dashboard-label">{genre}</p>
                  <p className="dashboard-empty-state">{count} song{count > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
