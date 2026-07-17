import React, { useState, useMemo } from 'react';

// 1. Mock Data (Kept at module level for optimal performance)
const SAMPLE_DATABASE = [
  { id: 1, name: "Wahu Kagwi", genre: "Afropop", location: "Nairobi", fee: "KSH 85K", rating: "4.9", live: true, icon: "🎵" },
  { id: 2, name: "Sauti Sol", genre: "Afro-Fusion", location: "Nairobi", fee: "KSH 250K", rating: "5.0", live: false, icon: "🎸" },
  { id: 3, name: "Khaligraph Jones", genre: "Hip Hop", location: "Nairobi", fee: "KSH 150K", rating: "4.8", live: true, icon: "🎤" },
  { id: 4, name: "Nikita Kering", genre: "R&B / Soul", location: "Nairobi", fee: "KSH 120K", rating: "4.9", live: false, icon: "✨" },
];

const TUTORIAL_STEPS = [
  {
    number: "01",
    icon: "👤",
    title: "Create Profile",
    description: "Artists showcase their talent, genre, and availability. Venues list their capacity, location, and event types."
  },
  {
    number: "02",
    icon: "🔍",
    title: "Discover Matches",
    description: "Smart filters help venues find the perfect artist for their audience, and artists find the right stage for their sound."
  },
  {
    number: "03",
    icon: "📋",
    title: "Send Booking Requests",
    description: "Seamlessly send, negotiate, and confirm bookings through our built-in messaging and contract system."
  },
  {
    number: "04",
    icon: "🚀",
    title: "Perform & Grow",
    description: "Build your reputation with reviews, track earnings, grow your fanbase, and get paid via M-Pesa or Stripe."
  }
];

const VENUE_DATABASE = [
  {
    id: 1,
    name: "Alchemist Bar",
    category: "Open Air Bar",
    location: "Westlands, Nairobi",
    capacity: "500",
    rating: "4.8",
    icon: "🍻",
    tags: ["Live Music", "DJ Nights", "Art Shows"]
  },
  {
    id: 2,
    name: "The Rustic",
    category: "Lounge",
    location: "Lavington, Nairobi",
    capacity: "200",
    rating: "4.7",
    icon: "🎸",
    tags: ["Acoustic Sets", "Jazz", "Cocktails"]
  },
  {
    id: 3,
    name: "Strathmore University",
    category: "Campus Venue",
    location: "Madaraka, Nairobi",
    capacity: "2,000",
    rating: "4.6",
    icon: "🎓",
    tags: ["Comedy Nights", "Concerts", "Debates"]
  }
];

// --- MAIN HERO / LANDING CONTENT COMPONENT ---
// Note: the site header now lives in Header.jsx and is rendered once
// by App.jsx above this component, so this file only owns the hero
// content and the sections below it.
export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

  // Cycle through featured artists
  const handleNextArtist = () => {
    setCurrentArtistIndex((prev) => (prev + 1) % SAMPLE_DATABASE.length);
  };

  // Real-time search processing
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return SAMPLE_DATABASE.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const featuredArtist = SAMPLE_DATABASE[currentArtistIndex];

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  return (
    <div style={pageContainerStyle}>
      {/* HERO SECTION */}
      <main style={heroGridStyle}>

        {/* LEFT COLUMN: Catchy copy and interactive search */}
        <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ textTransform: 'uppercase', color: '#ff3366', fontWeight: 'bold', letterSpacing: '2px', fontSize: '12px', margin: '0 0 10px 0' }}>
            Kenya's #1 Artist Platform
          </p>
          <h1 style={headlineStyle}>
            CONNECT.<br />
            PERFORM.<br />
            <span style={{ color: '#a855f7' }}>GROW.</span>
          </h1>
          <p style={subheadStyle}>
            Connect artists with fans and venues through one simple platform designed for discovering talent and booking unforgettable experiences.
          </p>

          {/* Search Field */}
          <div style={{ position: 'relative', marginTop: '30px', maxWidth: '500px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Search artists, genres (e.g., 'Afropop')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyle}
              />
              <button onClick={() => navigateTo('#/signup')} style={getStartedButtonStyle}>
                Get Started
              </button>
            </div>

            {/* REAL-TIME DROPDOWN */}
            {searchTerm.trim() && (
              <div style={dropdownStyle}>
                <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Live Results ({filteredResults.length})
                </p>
                {filteredResults.length > 0 ? (
                  filteredResults.map(artist => (
                    <div key={artist.id} style={dropdownItemStyle} onClick={() => navigateTo('#/signup')}>
                      <span style={{ marginRight: '10px' }}>{artist.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{artist.name}</div>
                        <div style={{ fontSize: '11px', color: '#aaa' }}>{artist.genre} • {artist.location}</div>
                      </div>
                      <span style={{ color: '#ff3366', fontSize: '12px', fontWeight: 'bold' }}>{artist.fee}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>No artists found. Try "Afropop" or "Sauti"!</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Interactive Glassmorphic Card */}
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={premiumCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffb703', letterSpacing: '1px' }}>
                🔥 TRENDING NOW
              </span>
              {featuredArtist.live && (
                <span style={liveBadgeStyle}>
                  ● LIVE
                </span>
              )}
            </div>

            <div style={{ margin: '25px 0 15px 0', display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={avatarGradientStyle}>
                {featuredArtist.icon}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold' }}>{featuredArtist.name}</h4>
                <p style={{ margin: '4px 0 0 0', color: '#aaa', fontSize: '13px' }}>{featuredArtist.genre} • {featuredArtist.location}</p>
                <p style={{ margin: '4px 0 0 0', color: '#ffb703', fontSize: '12px' }}>★ {featuredArtist.rating} (Verified)</p>
              </div>
            </div>

            {/* Audio Wave Animation */}
            <div style={{ display: 'flex', gap: '4px', height: '24px', alignItems: 'center', margin: '20px 0' }}>
              <div style={{ ...waveBar, height: '12px', animation: 'bounce 0.8s ease-in-out infinite' }} />
              <div style={{ ...waveBar, height: '22px', animation: 'bounce 0.5s ease-in-out infinite' }} />
              <div style={{ ...waveBar, height: '8px', animation: 'bounce 0.7s ease-in-out infinite' }} />
              <div style={{ ...waveBar, height: '24px', animation: 'bounce 0.4s ease-in-out infinite' }} />
              <div style={{ ...waveBar, height: '14px', animation: 'bounce 0.6s ease-in-out infinite' }} />
              <div style={{ ...waveBar, height: '18px', animation: 'bounce 0.9s ease-in-out infinite' }} />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '15px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <span style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>Avg. Performance Fee</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{featuredArtist.fee}</p>
              </div>
              <div>
                <span style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase' }}>Status</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: featuredArtist.live ? '#2ec4b6' : '#aaa' }}>
                  {featuredArtist.live ? 'Available Online' : 'Fully Booked'}
                </p>
              </div>
            </div>

            <button onClick={handleNextArtist} style={cardInteractiveButtonStyle}>
              Next Featured Artist ➜
            </button>
          </div>
        </section>

      </main>

      {/* FEATURED VENUES SECTION */}
      <FeaturedVenuesSection />

      {/* HOW IT WORKS SECTION */}
      <HowItWorksSection />

      {/* FINAL CTA SECTION */}
      <CtaSection />

      {/* Global CSS Styles for Animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.8); }
        }
      `}</style>
    </div>
  );
}

// --- SUB-COMPONENT: HOW IT WORKS TUTORIAL ---
function HowItWorksSection() {
  return (
    <section style={sectionContainerStyle}>
      <h2 style={sectionHeaderStyle}>
        HOW <span style={highlightTextStyle}>STAGELINK KE</span> WORKS
      </h2>

      <div style={gridStyle}>
        {TUTORIAL_STEPS.map((step, index) => (
          <div key={index} style={stepCardStyle} className="tutorial-card">
            <div style={stepNumberBackgroundStyle}>{step.number}</div>

            <div style={iconWrapperStyle}>
              {step.icon}
            </div>

            <h3 style={cardTitleStyle}>{step.title}</h3>
            <p style={cardDescriptionStyle}>{step.description}</p>
          </div>
        ))}
      </div>

      <style>{`
        .tutorial-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .tutorial-card:hover {
          transform: translateY(-8px);
          background: linear-gradient(145deg, rgba(138, 43, 226, 0.15), rgba(255, 51, 102, 0.05)) !important;
          border-color: rgba(168, 85, 247, 0.6) !important;
          box-shadow: 0 15px 30px rgba(168, 85, 247, 0.2);
        }
      `}</style>
    </section>
  );
}

// --- SUB-COMPONENT: FINAL CTA ---
function CtaSection() {
  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  return (
    <section style={ctaSectionStyle}>
      <p style={ctaKickerStyle}>Join The Movement</p>
      <h2 style={ctaTitleStyle}>
        READY TO <span style={highlightTextStyle}>TAKE THE STAGE?</span>
      </h2>
      <p style={ctaSubtitleStyle}>
        Join hundreds of artists and venues already building Kenya's most vibrant entertainment network.
      </p>

      <div style={ctaButtonRowStyle}>
        <button onClick={() => navigateTo('#/signup?role=artist')} style={ctaArtistButtonStyle}>
          🎤 Join as Artist
        </button>
        <button onClick={() => navigateTo('#/signup?role=venue')} style={ctaVenueButtonStyle}>
          🏛️ List Your Venue
        </button>
      </div>

      <p style={ctaFootnoteStyle}>Free to join · No credit card required · Start in minutes</p>
    </section>
  );
}

// --- SUB-COMPONENT: FEATURED VENUES ---
function FeaturedVenuesSection() {
  return (
    <section style={venuesSectionContainerStyle}>
      {/* Header Row */}
      <div style={venuesHeaderRowStyle}>
        <div>
          <p style={{ textTransform: 'uppercase', color: '#a855f7', fontWeight: 'bold', letterSpacing: '2px', fontSize: '11px', margin: '0 0 5px 0' }}>
            SPACES
          </p>
          <h2 style={venuesSectionHeaderStyle}>
            FEATURED <span style={highlightTextStyle}>VENUES</span>
          </h2>
        </div>
      </div>

      {/* Grid of Venue Cards */}
      <div style={venuesGridStyle}>
        {VENUE_DATABASE.map((venue) => (
          <div key={venue.id} style={venueCardStyle} className="venue-card">

            {/* Top Half (Visual Area with Category Badge and Icon) */}
            <div style={venueVisualAreaStyle}>
              <span style={categoryBadgeStyle}>{venue.category}</span>
              <div style={venueBigIconStyle}>{venue.icon}</div>
            </div>

            {/* Bottom Half (Information Area) */}
            <div style={venueInfoAreaStyle}>
              <h3 style={venueTitleStyle}>{venue.name}</h3>
              <p style={venueLocationStyle}>📍 {venue.location}</p>

              {/* Interactive Tags */}
              <div style={tagsContainerStyle}>
                {venue.tags.map((tag, i) => (
                  <span key={i} style={tagPillStyle}>{tag}</span>
                ))}
              </div>

              {/* Bottom Metadata Line */}
              <div style={venueMetaRowStyle}>
                <span style={{ color: '#aaa', fontSize: '13px' }}>
                  Capacity: <strong style={{ color: '#fff' }}>{venue.capacity}</strong>
                </span>
                <span style={{ color: '#ffb703', fontSize: '13px', fontWeight: 'bold' }}>
                  ★ {venue.rating}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive hover effects */}
      <style>{`
        .venue-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .venue-card:hover {
          transform: translateY(-8px);
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}

// --- CSS-IN-JS MODERN STYLING OBJECTS ---
const pageContainerStyle = {
  // No background here on purpose — the teal gradient from index.css's
  // `body` shows through, so this page matches the header, auth, and
  // dashboard screens instead of clashing with its own color scheme.
  color: '#fff',
  minHeight: '100vh',
  fontFamily: '"Inter", sans-serif',
  display: 'flex',
  flexDirection: 'column',
};

const heroGridStyle = {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '60px',
  padding: '60px 8%',
  alignItems: 'center',
};

const headlineStyle = {
  fontSize: '4.5rem',
  fontWeight: '900',
  lineHeight: '0.95',
  letterSpacing: '-2px',
  margin: '10px 0 20px 0',
};

const subheadStyle = {
  color: '#aaa',
  fontSize: '1.1rem',
  lineHeight: '1.6',
  maxWidth: '550px',
  margin: 0,
};

const searchInputStyle = {
  flex: 1,
  padding: '16px 24px',
  borderRadius: '30px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
};

const getStartedButtonStyle = {
  background: '#2ec4b6',
  color: '#fff',
  border: 'none',
  padding: '0 28px',
  borderRadius: '30px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '15px',
};

const dropdownStyle = {
  position: 'absolute',
  top: '65px',
  left: 0,
  right: 0,
  background: '#130c24',
  border: '1px solid rgba(168, 85, 247, 0.3)',
  borderRadius: '16px',
  padding: '15px',
  zIndex: 10,
  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
};

const dropdownItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background 0.2s',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
};

const premiumCardStyle = {
  background: 'linear-gradient(135deg, rgba(30, 15, 50, 0.7), rgba(15, 8, 30, 0.85))',
  border: '1px solid rgba(168, 85, 247, 0.2)',
  borderRadius: '24px',
  padding: '28px',
  width: '100%',
  maxWidth: '380px',
  boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
  backdropFilter: 'blur(10px)',
};

const liveBadgeStyle = {
  background: '#ff3366',
  padding: '3px 9px',
  borderRadius: '12px',
  fontSize: '10px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
};

const avatarGradientStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #a855f7, #ff3366)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
};

const waveBar = {
  width: '3px',
  background: '#a855f7',
  borderRadius: '2px',
  transformOrigin: 'bottom',
};

const cardInteractiveButtonStyle = {
  width: '100%',
  padding: '14px',
  borderRadius: '14px',
  border: 'none',
  background: 'linear-gradient(90deg, #a855f7, #ff3366)',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px',
};

const sectionContainerStyle = {
  padding: '80px 8%',
  textAlign: 'center',
  background: 'transparent',
  position: 'relative',
  zIndex: 2,
};

const sectionHeaderStyle = {
  fontSize: '2.5rem',
  fontWeight: '900',
  letterSpacing: '1px',
  marginBottom: '50px',
  color: '#fff',
};

const highlightTextStyle = {
  background: 'linear-gradient(90deg, #a855f7, #ff3366)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  position: 'relative',
};

const stepCardStyle = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '20px',
  padding: '40px 24px 30px 24px',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backdropFilter: 'blur(10px)',
  cursor: 'pointer',
};

const stepNumberBackgroundStyle = {
  position: 'absolute',
  top: '10px',
  fontSize: '5rem',
  fontWeight: '900',
  color: 'rgba(168, 85, 247, 0.04)',
  userSelect: 'none',
  zIndex: 1,
};

const iconWrapperStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  background: 'rgba(168, 85, 247, 0.1)',
  border: '1px solid rgba(168, 85, 247, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  marginBottom: '24px',
  zIndex: 2,
};

const cardTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#fff',
  margin: '0 0 12px 0',
  zIndex: 2,
};

const cardDescriptionStyle = {
  fontSize: '14px',
  color: '#aaa',
  lineHeight: '1.6',
  margin: 0,
  zIndex: 2,
};

const venuesSectionContainerStyle = {
  padding: '60px 8%',
  background: 'transparent',
  position: 'relative',
  zIndex: 2,
};

const venuesHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '40px',
};

const venuesSectionHeaderStyle = {
  fontSize: '2.5rem',
  fontWeight: '900',
  letterSpacing: '-1px',
  margin: 0,
  color: '#fff',
};

const venuesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
};

const venueCardStyle = {
  background: 'linear-gradient(180deg, rgba(30, 20, 50, 0.4) 0%, rgba(15, 10, 25, 0.85) 100%)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '24px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
};

const venueVisualAreaStyle = {
  padding: '30px 24px',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(0, 0, 0, 0.2) 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
};

const categoryBadgeStyle = {
  position: 'absolute',
  left: '20px',
  top: '20px',
  background: 'rgba(255, 115, 0, 0.15)',
  border: '1px solid rgba(255, 115, 0, 0.3)',
  color: '#ff7300',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '11px',
  fontWeight: 'bold',
};

const venueBigIconStyle = {
  fontSize: '48px',
  margin: '20px 0 10px 0',
  filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
};

const venueInfoAreaStyle = {
  padding: '24px',
};

const venueTitleStyle = {
  fontSize: '1.4rem',
  fontWeight: '900',
  margin: '0 0 6px 0',
  color: '#fff',
  letterSpacing: '-0.5px',
};

const venueLocationStyle = {
  color: '#888',
  fontSize: '13px',
  margin: '0 0 16px 0',
};

const tagsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '20px',
};

const tagPillStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#aaa',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '12px',
};

const ctaSectionStyle = {
  padding: '70px 8% 90px',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
};

const ctaKickerStyle = {
  textTransform: 'uppercase',
  color: '#a7f3d0',
  fontWeight: 'bold',
  letterSpacing: '2px',
  fontSize: '12px',
  margin: '0 0 15px 0',
};

const ctaTitleStyle = {
  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
  fontWeight: '900',
  letterSpacing: '-1px',
  lineHeight: '1.1',
  margin: '0 0 20px 0',
  color: '#fff',
};

const ctaSubtitleStyle = {
  color: '#d8fffb',
  fontSize: '1.05rem',
  lineHeight: '1.6',
  maxWidth: '560px',
  margin: '0 auto 35px auto',
};

const ctaButtonRowStyle = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const ctaArtistButtonStyle = {
  padding: '16px 30px',
  borderRadius: '14px',
  border: 'none',
  background: 'linear-gradient(90deg, #a855f7, #ff3366)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.35)',
};

const ctaVenueButtonStyle = {
  padding: '16px 30px',
  borderRadius: '14px',
  border: 'none',
  background: '#ff7300',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(255, 115, 0, 0.3)',
};

const ctaFootnoteStyle = {
  marginTop: '24px',
  color: '#9fb8b6',
  fontSize: '13px',
};

const venueMetaRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  paddingTop: '15px',
};