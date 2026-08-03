

function Input({
  label,
  error,
  id,
  type = "text",
  register,
  placeholder,
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={`w-full rounded-lg border px-3 py-2 outline-none transition
        ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />

      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}

export default Input;