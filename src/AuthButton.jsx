export default function AuthButton({
  children,
  type = 'button',
  disabled = false,
  ariaLabel,
}) {
  return (
    <button className="auth-button" type={type} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
