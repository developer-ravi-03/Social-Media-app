/* eslint-disable react/prop-types */
export default function Button({ type, className, children }) {
  return (
    <button
      type={type}
      className={`p-2 rounded text-white font-bold ${className}`}
    >
      {children}
    </button>
  );
}
