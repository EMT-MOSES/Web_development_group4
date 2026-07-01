import { useState } from 'react';
import AuthLayout from './AuthLayout';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import { getAllUsers } from './utils/userStorage';

const initialFormData = {
  email: '',
  password: '',
};

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (feedback.message) {
      setFeedback({ type: '', message: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = normalizeEmail(formData.email);
    const password = formData.password.trim();

    if (!email || !password) {
      setFeedback({
        type: 'error',
        message: 'Please enter both email and password.',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      const users = await getAllUsers();
      const user = users.find(
        (candidate) =>
          normalizeEmail(candidate.email || '') === email &&
          candidate.password === password,
      );

      if (!user) {
        setFeedback({
          type: 'error',
          message: 'Invalid email or password. Please try again.',
        });
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      setFeedback({
        type: 'success',
        message: `Welcome ${user.name}`,
      });

      const routeByRole = {
        artist: '#/artist-dashboard',
        fan: '#/fan-dashboard',
        venue: '#/venue-dashboard',
      };

      window.location.hash = routeByRole[user.role] || '#/artist-dashboard';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout kicker="Welcome back" title="Log In">
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
          ariaInvalid={feedback.type === 'error' && !formData.email.trim()}
          autoComplete="email"
          disabled={isSubmitting}
        />

        <AuthInput
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
          ariaInvalid={feedback.type === 'error' && !formData.password.trim()}
          autoComplete="current-password"
          disabled={isSubmitting}
        />

        <AuthButton type="submit" disabled={isSubmitting} ariaLabel="Login">
          {isSubmitting ? 'Logging in...' : 'Login'}
        </AuthButton>

        {feedback.message ? (
          <p className={`auth-message ${feedback.type}`} aria-live="polite">
            {feedback.message}
          </p>
        ) : null}
      </form>

      <p className="auth-text">
        Don&apos;t have an account?{' '}
        <a className="auth-link" href="#/signup">
          Sign Up
        </a>
      </p>
    </AuthLayout>
  );
}
