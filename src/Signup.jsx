import { useState } from 'react';
import AuthLayout from './AuthLayout';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Artist',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  return (
    <AuthLayout kicker="Create your account" title="Sign Up">
      <form className="auth-form">
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

        <AuthButton type="button">Sign Up</AuthButton>
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
