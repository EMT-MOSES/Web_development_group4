import { useEffect, useState } from 'react';
import { heroData } from './mockData';

const { title, rotatingWords, subtitle, searchPlaceholder, ctaText } = heroData;

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = rotatingWords[currentWordIndex];
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
          setCurrentWordIndex((index) => (index + 1) % rotatingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, rotatingWords]);

  return (
    <section className="hero-section">
      <h2 className="hero-title">
        {title}
        <span className="typing-text"> {displayedText}</span>
        <span className="typing-cursor">|</span>
      </h2>
      <p className="hero-subtitle">{subtitle}</p>

      <div className="search-area">
        <input type="text" placeholder={searchPlaceholder} />
        <button type="button">{ctaText}</button>
      </div>
    </section>
  );
}
