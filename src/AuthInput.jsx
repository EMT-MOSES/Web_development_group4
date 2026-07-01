export default function AuthInput({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  required = false,
  ariaInvalid = false,
  ariaDescribedBy,
  autoComplete,
  disabled = false,
}) {
  return (
    <label className="auth-field">
      <span>{placeholder}</span>
      <input
        className="auth-input"
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </label>
  );
}
