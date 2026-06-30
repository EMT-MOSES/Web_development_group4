import { useEffect, useState } from 'react';

const words = ['Artists', 'Fans', 'Venues'];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);

        if (nextText === currentWord) {
          setIsDeleting(true);
        }
      } else {
        const nextText = currentWord.slice(0, displayedText.length - 1);
        setDisplayedText(nextText);

        if (nextText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((index) => (index + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section className="hero-section">
      <h2 className="hero-title">
        Discover Amazing
        <span className="typing-text"> {displayedText}</span>
        <span className="typing-cursor">|</span>
      </h2>
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
