const ARTIST_PROFILES_KEY = 'artistProfiles';
const ARTIST_MUSIC_KEY = 'artistMusic';

function loadStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export default function FanArtistDiscovery({ selectedArtist, onSelectArtist }) {
  const artistProfiles = loadStoredList(ARTIST_PROFILES_KEY);
  const artistMusic = loadStoredList(ARTIST_MUSIC_KEY);

  if (artistProfiles.length === 0) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Browse Artists</h3>
        <p className="dashboard-empty-state">No artists available yet.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card">
      <h3 className="dashboard-card-title">Browse Artists</h3>

      <div className="fan-grid">
        {artistProfiles.map((artist) => (
          <div key={artist.userId} className="fan-card">
            <div className="fan-card-image">
              {artist.profileImage ? (
                <img src={artist.profileImage} alt={artist.stageName || 'Artist'} />
              ) : (
                <span>🎤</span>
              )}
            </div>

            <div className="fan-card-content">
              <p className="dashboard-label">Stage Name</p>
              <h4>{artist.stageName || 'Untitled Artist'}</h4>
              <p className="dashboard-label">Genre</p>
              <p>{artist.genre || 'No genre listed'}</p>
              <p className="dashboard-label">Location</p>
              <p>{artist.location || 'Unknown location'}</p>
              <p className="dashboard-label">Bio</p>
              <p>{artist.bio || 'No bio available yet.'}</p>

              <button className="auth-button" type="button" onClick={() => onSelectArtist(artist)}>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedArtist ? (
        <div className="fan-profile-layout">
          <div className="dashboard-preview-card">
            <p className="dashboard-label">Artist Profile</p>
            <h4>{selectedArtist.stageName}</h4>
            <p><strong>Genre:</strong> {selectedArtist.genre}</p>
            <p><strong>Bio:</strong> {selectedArtist.bio}</p>
            <p><strong>Location:</strong> {selectedArtist.location}</p>
            <p><strong>Performance Fee:</strong> {selectedArtist.performanceFee || 'N/A'}</p>
            <div className="fan-link-list">
              {selectedArtist.socialLinks?.instagram ? (
                <a href={selectedArtist.socialLinks.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              ) : null}
              {selectedArtist.socialLinks?.youtube ? (
                <a href={selectedArtist.socialLinks.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              ) : null}
              {selectedArtist.socialLinks?.spotify ? (
                <a href={selectedArtist.socialLinks.spotify} target="_blank" rel="noreferrer">
                  Spotify
                </a>
              ) : null}
            </div>
          </div>

          <div className="dashboard-preview-card">
            <p className="dashboard-label">Songs</p>
            {artistMusic.filter((song) => song.artistId === selectedArtist.userId).length === 0 ? (
              <p className="dashboard-empty-state">No songs uploaded yet.</p>
            ) : (
              <div className="music-card-grid">
                {artistMusic
                  .filter((song) => song.artistId === selectedArtist.userId)
                  .map((song) => (
                    <div key={song.id} className="music-card">
                      <img className="music-cover" src={song.coverImage} alt={`${song.title} cover`} />
                      <div className="music-card-content">
                        <p className="dashboard-label">Title</p>
                        <h4>{song.title}</h4>
                        <p className="dashboard-label">Genre</p>
                        <p>{song.genre}</p>
                        <p className="dashboard-label">Description</p>
                        <p>{song.description}</p>
                        <p className="dashboard-label">Upload Date</p>
                        <p>{song.uploadDate}</p>
                        <p className="dashboard-label">Audio URL</p>
                        <a href={song.audioUrl} target="_blank" rel="noreferrer">
                          {song.audioUrl}
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}
