export default function AuthInput({ type = 'text', name, value, placeholder, onChange, required = false }) {
  return (
    <label className="auth-field">
      <span>{placeholder}</span>
      <input
        className="auth-input"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}
