export default function Signup() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="signup-title">
        <div className="auth-header">
          <p className="auth-kicker">Create your account</p>
          <h2 id="signup-title" className="auth-title">
            Sign Up
          </h2>
        </div>

        <form className="auth-form">
          <label className="auth-field">
            <span>Full Name</span>
            <input className="auth-input" type="text" placeholder="Your full name" />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input className="auth-input" type="email" placeholder="you@example.com" />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input className="auth-input" type="password" placeholder="Create a password" />
          </label>

          <label className="auth-field">
            <span>Role</span>
            <select className="auth-input auth-select" defaultValue="Artist">
              <option value="Artist">Artist</option>
              <option value="Fan">Fan</option>
              <option value="Venue">Venue</option>
            </select>
          </label>

          <button className="auth-button" type="button">
            Sign Up
          </button>
        </form>

        <p className="auth-text">
          Already have an account?{' '}
          <a className="auth-link" href="/">
            Log In
          </a>
        </p>
      </section>
    </main>
  );
}
