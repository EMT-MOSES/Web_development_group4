import { useState } from 'react';
import AuthLayout from './AuthLayout';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  role: 'Artist',
};

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export default function Signup() {
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

    const name = formData.name.trim();
    const email = normalizeEmail(formData.email);
    const password = formData.password.trim();

    if (!name || !email || !password) {
      setFeedback({
        type: 'error',
        message: 'Please complete all required signup fields.',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const duplicateEmail = existingUsers.some(
        (user) => normalizeEmail(user.email || '') === email,
      );

      if (duplicateEmail) {
        setFeedback({
          type: 'error',
          message: 'This email is already registered. Please use a different email address.',
        });
        return;
      }

      const nextUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: formData.role.toLowerCase(),
      };

      localStorage.setItem('users', JSON.stringify([...existingUsers, nextUser]));
      setFeedback({
        type: 'success',
        message: 'Account created successfully!',
      });
      setFormData(initialFormData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout kicker="Create your account" title="Sign Up">
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
          ariaInvalid={feedback.type === 'error' && !formData.name.trim()}
          autoComplete="name"
          disabled={isSubmitting}
        />

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
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <label className="auth-field">
          <span>Role</span>
          <select
            className="auth-input auth-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-label="Select your role"
          >
            <option value="Artist">Artist</option>
            <option value="Fan">Fan</option>
            <option value="Venue">Venue</option>
          </select>
        </label>

        <AuthButton type="submit" disabled={isSubmitting} ariaLabel="Sign up">
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </AuthButton>

        {feedback.message ? (
          <p className={`auth-message ${feedback.type}`} aria-live="polite">
            {feedback.message}
          </p>
        ) : null}
      </form>

      <p className="auth-text">
        Already have an account?{' '}
        <a className="auth-link" href="#/login">
          Log In
        </a>
      </p>
    </AuthLayout>
  );
}
