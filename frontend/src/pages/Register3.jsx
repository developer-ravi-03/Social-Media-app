import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Upload,AlertCircle } from "lucide-react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic: null,
  });
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("No file chosen");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm({
        ...form,
        [name]: files[0],
      });
      setFileName(files[0].name);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Form submitted", form);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-40 blur-3xl animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        className="mt-5 mb-5 relative bg-white text-gray-900 p-12 rounded-3xl shadow-2xl w-[35rem] border border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Create Account</h2>
        {error && (
          <div className="flex items-center bg-red-100 text-red-600 p-3 rounded-lg mb-3">
            <AlertCircle className="w-5 h-5 mr-2" /> {error}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="p-3 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-400" />
          <Input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="p-3 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-400" />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-3 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-400" />
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="p-3 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-400" />
          <select name="gender" className="w-full p-3 rounded-lg bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-400" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 transition">
            <div className="flex items-center">
              <Upload className="w-5 h-5 mr-2" /> Upload Profile Picture
            </div>
            <span className="text-gray-700">{fileName}</span>
            <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="hidden" />
          </label>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 transition-all p-3 rounded-lg text-lg font-semibold text-white">Sign Up</Button>
        </form>
        <p className="text-center mt-6">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
