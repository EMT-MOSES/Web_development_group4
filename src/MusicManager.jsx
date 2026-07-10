import { useEffect, useMemo, useState } from 'react';

const ARTIST_MUSIC_KEY = 'artistMusic';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

function createEmptySong() {
  return {
    title: '',
    genre: '',
    description: '',
    audioUrl: '',
    coverImage: '',
  };
}

function loadArtistMusic() {
  try {
    return JSON.parse(localStorage.getItem(ARTIST_MUSIC_KEY)) || [];
  } catch {
    return [];
  }
}

export default function MusicManager() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState(createEmptySong);
  const [editingSongId, setEditingSongId] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    const allSongs = loadArtistMusic();
    const artistSongs = allSongs.filter((song) => song.artistId === currentUser.id);
    setSongs(artistSongs);
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentUser?.id) {
      setFeedback({
        type: 'error',
        message: 'Please log in to manage music.',
      });
      return;
    }

    const title = formData.title.trim();
    const genre = formData.genre.trim();
    const description = formData.description.trim();
    const audioUrl = formData.audioUrl.trim();
    const coverImage = formData.coverImage.trim();

    if (!title || !genre || !description || !audioUrl || !coverImage) {
      setFeedback({
        type: 'error',
        message: 'Please complete all fields before saving the song.',
      });
      return;
    }

    const allSongs = loadArtistMusic();
    const nextSong = {
      id: editingSongId || Date.now(),
      artistId: currentUser.id,
      title,
      genre,
      description,
      audioUrl,
      coverImage,
      uploadDate: new Date().toISOString().split('T')[0],
    };

    if (editingSongId) {
      const nextSongs = allSongs.map((song) =>
        song.id === editingSongId ? { ...song, ...nextSong } : song,
      );
      localStorage.setItem(ARTIST_MUSIC_KEY, JSON.stringify(nextSongs));
      setSongs(nextSongs.filter((song) => song.artistId === currentUser.id));
      setFeedback({
        type: 'success',
        message: 'Song updated successfully.',
      });
    } else {
      const nextSongs = [...allSongs, nextSong];
      localStorage.setItem(ARTIST_MUSIC_KEY, JSON.stringify(nextSongs));
      setSongs(nextSongs.filter((song) => song.artistId === currentUser.id));
      setFeedback({
        type: 'success',
        message: 'Song added successfully.',
      });
    }

    setFormData(createEmptySong());
    setEditingSongId(null);
  };

  const handleEdit = (song) => {
    setEditingSongId(song.id);
    setFormData({
      title: song.title,
      genre: song.genre,
      description: song.description,
      audioUrl: song.audioUrl,
      coverImage: song.coverImage,
    });
    setFeedback({ type: '', message: '' });
  };

  const handleDelete = (songId) => {
    const confirmed = window.confirm('Delete this song from your library?');

    if (!confirmed) {
      return;
    }

    const allSongs = loadArtistMusic();
    const nextSongs = allSongs.filter((song) => song.id !== songId);
    localStorage.setItem(ARTIST_MUSIC_KEY, JSON.stringify(nextSongs));
    setSongs(nextSongs.filter((song) => song.artistId === currentUser.id));
    setFeedback({
      type: 'success',
      message: 'Song deleted successfully.',
    });

    if (editingSongId === songId) {
      setEditingSongId(null);
      setFormData(createEmptySong());
    }
  };

  const resetForm = () => {
    setFormData(createEmptySong());
    setEditingSongId(null);
    setFeedback({ type: '', message: '' });
  };

  if (!currentUser) {
    return (
      <section className="dashboard-card">
        <h3 className="dashboard-card-title">My Music</h3>
        <p className="dashboard-empty-state">Please log in to manage your music library.</p>
      </section>
    );
  }

  return (
    <section className="dashboard-music-layout">
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>Song Title</span>
            <input
              className="dashboard-input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Forever"
              required
            />
          </label>

          <label className="dashboard-field">
            <span>Genre</span>
            <input
              className="dashboard-input"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Afrobeats"
              required
            />
          </label>

          <label className="dashboard-field dashboard-field-full">
            <span>Description</span>
            <textarea
              className="dashboard-input dashboard-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Debut single"
              required
            />
          </label>

          <label className="dashboard-field dashboard-field-full">
            <span>Audio URL</span>
            <input
              className="dashboard-input"
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleChange}
              placeholder="https://example.com/song.mp3"
              required
            />
          </label>

          <label className="dashboard-field dashboard-field-full">
            <span>Cover Image URL</span>
            <input
              className="dashboard-input"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              required
            />
          </label>
        </div>

        <div className="music-actions-row">
          <button className="auth-button" type="submit">
            {editingSongId ? 'Save Changes' : 'Add Song'}
          </button>

          <button className="music-secondary-button" type="button" onClick={resetForm}>
            Reset
          </button>
        </div>

        {feedback.message ? (
          <p className={`auth-message ${feedback.type}`} aria-live="polite">
            {feedback.message}
          </p>
        ) : null}
      </form>

      <div className="music-list-wrapper">
        <h3 className="dashboard-card-title">Your Songs</h3>

        {songs.length === 0 ? (
          <p className="dashboard-empty-state">No songs uploaded yet. Add your first release above.</p>
        ) : (
          <div className="music-card-grid">
            {songs.map((song) => (
              <article key={song.id} className="music-card">
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

                  <div className="music-card-actions">
                    <button className="music-secondary-button" type="button" onClick={() => handleEdit(song)}>
                      Edit
                    </button>
                    <button className="music-danger-button" type="button" onClick={() => handleDelete(song.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
