
const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: ['For Artists', 'For Venues', 'For Fans', 'Pricing', 'M-Pesa Payments'],
  },
  {
    title: 'Discover',
    links: ['Browse Artists', 'Browse Venues', 'Upcoming Events', 'Blog', 'Success Stories'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'],
  },
];

const SOCIAL_ICONS = [
  { label: 'Instagram', icon: '📷' },
  { label: 'X / Twitter', icon: '🐦' },
  { label: 'Spotify', icon: '🎵' },
  { label: 'YouTube', icon: '▶️' },
  { label: 'WhatsApp', icon: '💬' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-brand-name">StageLink Kenya</span>
          <p className="footer-tagline">
            Connecting Kenya's most talented artists with the best venues. Building the future of
            live entertainment, one performance at a time.
          </p>
          <div className="footer-social">
            {SOCIAL_ICONS.map((social) => (
              <a
                key={social.label}
                href="#/"
                className="footer-social-icon"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className="footer-column">
            <p className="footer-column-title">{column.title}</p>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#/">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {year} StageLink Kenya. All rights reserved.</span>
        <span>Made for Kenya's live entertainment scene 🇰🇪</span>
      </div>
    </footer>
  );
}
