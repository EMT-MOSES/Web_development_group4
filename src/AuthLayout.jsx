export default function AuthLayout({ kicker, title, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-header">
          <p className="auth-kicker">{kicker}</p>
          <h2 id="auth-title" className="auth-title">
            {title}
          </h2>
        </div>

        {children}
      </section>
    </main>
  );
}
