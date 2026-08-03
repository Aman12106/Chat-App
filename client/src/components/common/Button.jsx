function Button({
  children,
  type = "button",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;