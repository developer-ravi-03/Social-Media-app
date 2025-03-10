/* eslint-disable react/prop-types */
export default function Input({ type, name, placeholder, onChange, required, accept }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      accept={accept}
      className="w-full p-2 rounded bg-gray-200 text-black focus:ring-2 focus:ring-purple-500 outline-none"
    />
  );
}
