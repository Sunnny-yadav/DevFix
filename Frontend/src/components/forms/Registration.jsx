import { motion } from 'framer-motion';
import { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    experience: 'Beginner',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
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
          <input type="text" name="username" placeholder="Username" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          
          <select name="experience" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input type="file" accept="image/*" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleFileChange} />
          
          <motion.button 
            type="submit" 
            className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}