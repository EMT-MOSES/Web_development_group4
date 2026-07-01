export default function Login() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-header">
          <p className="auth-kicker">Welcome back</p>
          <h2 id="login-title" className="auth-title">
            Log In
          </h2>
        </div>

        <form className="auth-form">
          <label className="auth-field">
            <span>Email</span>
            <input className="auth-input" type="email" placeholder="you@example.com" />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input className="auth-input" type="password" placeholder="Enter your password" />
          </label>

          <button className="auth-button" type="button">
            Login
          </button>
        </form>

        <p className="auth-text">
          Don&apos;t have an account?{' '}
          <a className="auth-link" href="/">
            Sign Up
          </a>
        </p>
      </section>
    </main>
  );
}
