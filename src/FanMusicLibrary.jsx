const ARTIST_MUSIC_KEY = 'artistMusic';
const ARTIST_PROFILES_KEY = 'artistProfiles';

function loadStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export default function FanMusicLibrary() {
  const songs = loadStoredList(ARTIST_MUSIC_KEY);
  const artistProfiles = loadStoredList(ARTIST_PROFILES_KEY);

  if (songs.length === 0) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Music Library</h3>
        <p className="dashboard-empty-state">No songs available yet.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card">
      <h3 className="dashboard-card-title">Music Library</h3>

      <div className="music-card-grid">
        {songs.map((song) => {
          const artist = artistProfiles.find((profile) => profile.userId === song.artistId);

          return (
            <div key={song.id} className="music-card">
              <img className="music-cover" src={song.coverImage} alt={`${song.title} cover`} />
              <div className="music-card-content">
                <p className="dashboard-label">Artist</p>
                <h4>{artist?.stageName || 'Unknown Artist'}</h4>
                <p className="dashboard-label">Song</p>
                <p>{song.title}</p>
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
          );
        })}
      </div>
    </article>
  );
}
