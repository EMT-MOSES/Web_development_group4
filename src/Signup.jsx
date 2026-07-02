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

export default function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextUser = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role.toLowerCase(),
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const duplicateEmail = existingUsers.some(
      (user) => user.email.toLowerCase() === nextUser.email,
    );

    if (duplicateEmail) {
      setFeedback({
        type: 'error',
        message: 'An account with this email already exists.',
      });
      return;
    }

    localStorage.setItem('users', JSON.stringify([...existingUsers, nextUser]));
    setFeedback({
      type: 'success',
      message: 'Account created successfully!',
    });
    setFormData(initialFormData);
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
        />

        <AuthInput
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <AuthInput
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <label className="auth-field">
          <span>Role</span>
          <select
            className="auth-input auth-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Artist">Artist</option>
            <option value="Fan">Fan</option>
            <option value="Venue">Venue</option>
          </select>
        </label>

        <AuthButton type="submit">Sign Up</AuthButton>

        {feedback.message ? (
          <p className={`auth-message ${feedback.type}`} aria-live="polite">
            {feedback.message}
          </p>
        ) : null}
      </form>

      <p className="auth-text">
        Already have an account?{' '}
        <a className="auth-link" href="/">
          Log In
        </a>
      </p>
    </AuthLayout>
  );
}
