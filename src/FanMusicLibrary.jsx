import { useEffect, useMemo, useState } from 'react';
import { filterAndSortMusic } from './utils/searchUtils';

const ARTIST_MUSIC_KEY = 'artistMusic';
const ARTIST_PROFILES_KEY = 'artistProfiles';

function loadStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

const defaultGenres = ['All Genres', 'Afrobeats', 'Hip Hop', 'Gospel', 'R&B', 'Pop', 'Jazz'];

export default function FanMusicLibrary() {
  const songs = loadStoredList(ARTIST_MUSIC_KEY);
  const artistProfiles = loadStoredList(ARTIST_PROFILES_KEY);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All Genres');
  const [sortValue, setSortValue] = useState('alphabetical');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const genreOptions = useMemo(() => {
    const discovered = new Set(defaultGenres);
    songs.forEach((song) => {
      if (song.genre) {
        discovered.add(song.genre);
      }
    });

    return Array.from(discovered);
  }, [songs]);

  const filteredSongs = useMemo(
    () => filterAndSortMusic(songs, artistProfiles, searchTerm, genreFilter, sortValue),
    [songs, artistProfiles, searchTerm, genreFilter, sortValue],
  );

  if (loading) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Music Library</h3>
        <p className="dashboard-empty-state">Loading music...</p>
      </article>
    );
  }

  if (songs.length === 0) {
    return (
      <article className="dashboard-card">
        <h3 className="dashboard-card-title">Music Library</h3>
        <p className="dashboard-empty-state">No music uploaded.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card">
      <h3 className="dashboard-card-title">Music Library</h3>

      <div className="search-controls">
        <input
          className="dashboard-input"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search songs by title, genre, or artist"
        />

        <select className="dashboard-input" value={genreFilter} onChange={(event) => setGenreFilter(event.target.value)}>
          {genreOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select className="dashboard-input" value={sortValue} onChange={(event) => setSortValue(event.target.value)}>
          <option value="alphabetical">A → Z</option>
          <option value="recently-uploaded">Recently Uploaded</option>
        </select>
      </div>

      {filteredSongs.length === 0 ? (
        <p className="dashboard-empty-state">No music found.</p>
      ) : (
        <div className="music-card-grid">
          {filteredSongs.map((song) => {
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
      )}
    </article>
  );
}
