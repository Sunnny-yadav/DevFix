import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div 
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md text-gray-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Login to DevFix Hub</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white" onChange={handleChange} required />
          
          <motion.button 
            type="submit" 
            className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account? <Link to="/register-user" className="text-green-400 hover:underline">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
}
