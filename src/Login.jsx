import { useState } from 'react';
import AuthLayout from './AuthLayout';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  return (
    <AuthLayout kicker="Welcome back" title="Log In">
      <form className="auth-form">
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

        <AuthButton type="button">Login</AuthButton>
      </form>

      <p className="auth-text">
        Don&apos;t have an account?{' '}
        <a className="auth-link" href="/">
          Sign Up
        </a>
      </p>
    </AuthLayout>
  );
}
