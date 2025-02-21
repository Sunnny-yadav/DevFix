import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const [userData, setuserData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    experience: 'Beginner',
    profilePicture: null,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setuserData({ ...userData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData)
    const formData = new FormData()

    for (const key in userData) {
      formData.append(key, userData[key])
    }

    try {
      const toastId = toast.loading("Registration under process")
      const response = await fetch("http://localhost:8000/api/v1/users/register-user", {
        method: "POST",
        body: formData
      });

      const responseData = await response.json();
      console.log("responeData",responseData)
      if (response.ok) {
        toast.success(responseData.message, { id: toastId })
        navigate("/login")
      } else {
        toast.error(responseData.message, { id: toastId })
      }

    } catch (error) {
      console.log("Error occured while user Registration process", error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md text-gray-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Register to DevFix Hub</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="text" name="userName" placeholder="userName" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />

          <select name="experience" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label className="block text-gray-400">Profile Picture:</label>
          <input type="file" accept="image/*" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleFileChange} />

          <motion.button
            type="submit"
            className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
}