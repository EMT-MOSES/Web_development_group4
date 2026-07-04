import { useEffect, useMemo, useState } from 'react';

const ARTIST_PROFILES_KEY = 'artistProfiles';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    return null;
  }
}

function createEmptyProfile() {
  return {
    userId: '',
    stageName: '',
    genre: '',
    bio: '',
    location: '',
    performanceFee: '',
    profileImage: '',
    socialLinks: {
      instagram: '',
      youtube: '',
      spotify: '',
    },
  };
}

function loadArtistProfiles() {
  try {
    return JSON.parse(localStorage.getItem(ARTIST_PROFILES_KEY)) || [];
  } catch {
    return [];
  }
}

export default function ArtistProfile() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [formData, setFormData] = useState(createEmptyProfile);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    const profiles = loadArtistProfiles();
    const existingProfile = profiles.find((profile) => profile.userId === currentUser.id);

    if (existingProfile) {
      setFormData(existingProfile);
      setSavedProfile(existingProfile);
    } else {
      setFormData((currentData) => ({
        ...createEmptyProfile(),
        userId: currentUser.id,
      }));
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      socialLinks: {
        ...currentData.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentUser?.id) {
      setFeedback({
        type: 'error',
        message: 'You must be logged in to save a profile.',
      });
      return;
    }

    const stageName = formData.stageName.trim();
    const genre = formData.genre.trim();
    const bio = formData.bio.trim();
    const location = formData.location.trim();
    const performanceFee = Number(formData.performanceFee);

    if (!stageName || !genre || !bio || !location || Number.isNaN(performanceFee) || performanceFee <= 0) {
      setFeedback({
        type: 'error',
        message: 'Please complete all required profile fields with valid values.',
      });
      return;
    }

    const nextProfile = {
      ...formData,
      userId: currentUser.id,
      stageName,
      genre,
      bio,
      location,
      performanceFee,
      socialLinks: {
        instagram: formData.socialLinks.instagram.trim(),
        youtube: formData.socialLinks.youtube.trim(),
        spotify: formData.socialLinks.spotify.trim(),
      },
    };

    const profiles = loadArtistProfiles();
    const existingIndex = profiles.findIndex((profile) => profile.userId === currentUser.id);

    if (existingIndex >= 0) {
      profiles[existingIndex] = nextProfile;
    } else {
      profiles.push(nextProfile);
    }

    localStorage.setItem(ARTIST_PROFILES_KEY, JSON.stringify(profiles));
    setSavedProfile(nextProfile);
    setFeedback({
      type: 'success',
      message: 'Artist profile saved successfully.',
    });
  };

  if (!currentUser) {
    return (
      <section className="dashboard-card">
        <h3 className="dashboard-card-title">Artist Profile</h3>
        <p className="dashboard-empty-state">Please log in to manage your artist profile.</p>
      </section>
    );
  }

  return (
    <section className="dashboard-profile-layout">
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>Stage Name</span>
            <input
              className="dashboard-input"
              name="stageName"
              value={formData.stageName}
              onChange={handleChange}
              placeholder="John Artist"
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
            <span>Bio</span>
            <textarea
              className="dashboard-input dashboard-textarea"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Upcoming artist from Nairobi."
              required
            />
          </label>

          <label className="dashboard-field">
            <span>Location</span>
            <input
              className="dashboard-input"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Nairobi"
              required
            />
          </label>

          <label className="dashboard-field">
            <span>Performance Fee</span>
            <input
              className="dashboard-input"
              name="performanceFee"
              type="number"
              value={formData.performanceFee}
              onChange={handleChange}
              placeholder="500"
              required
            />
          </label>

          <label className="dashboard-field">
            <span>Profile Image URL</span>
            <input
              className="dashboard-input"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <label className="dashboard-field">
            <span>Instagram</span>
            <input
              className="dashboard-input"
              name="instagram"
              value={formData.socialLinks.instagram}
              onChange={handleSocialLinkChange}
              placeholder="https://instagram.com/username"
            />
          </label>

          <label className="dashboard-field">
            <span>YouTube</span>
            <input
              className="dashboard-input"
              name="youtube"
              value={formData.socialLinks.youtube}
              onChange={handleSocialLinkChange}
              placeholder="https://youtube.com/@channel"
            />
          </label>

          <label className="dashboard-field">
            <span>Spotify</span>
            <input
              className="dashboard-input"
              name="spotify"
              value={formData.socialLinks.spotify}
              onChange={handleSocialLinkChange}
              placeholder="https://open.spotify.com/artist/..."
            />
          </label>
        </div>

        <button className="auth-button" type="submit">
          Save Profile
        </button>

        {feedback.message ? (
          <p className={`auth-message ${feedback.type}`} aria-live="polite">
            {feedback.message}
          </p>
        ) : null}
      </form>

      <article className="dashboard-preview-card">
        <h3 className="dashboard-card-title">Profile Preview</h3>
        <div className="dashboard-profile-preview">
          <div>
            <p className="dashboard-label">Stage Name</p>
            <p>{savedProfile?.stageName || 'No profile saved yet'}</p>
          </div>
          <div>
            <p className="dashboard-label">Genre</p>
            <p>{savedProfile?.genre || '—'}</p>
          </div>
          <div>
            <p className="dashboard-label">Location</p>
            <p>{savedProfile?.location || '—'}</p>
          </div>
          <div>
            <p className="dashboard-label">Performance Fee</p>
            <p>{savedProfile?.performanceFee ? `$${savedProfile.performanceFee}` : '—'}</p>
          </div>
          <div>
            <p className="dashboard-label">Bio</p>
            <p>{savedProfile?.bio || '—'}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
