export default function Hero() {
  return (
    <section className="hero-section">
      <h2 className="hero-title">Discover Amazing Artists, Fans and Venues</h2>
      <p className="hero-subtitle">
        Connect artists with fans and venues through one simple platform designed
        for discovering talent and booking unforgettable experiences.
      </p>

      <div className="search-area">
        <input type="text" placeholder="Search artists, venues..." />
        <button type="button">Get Started</button>
      </div>
    </section>
  );
}
