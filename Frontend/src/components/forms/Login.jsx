import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/auth.context';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()

  const {SetTokenInLocalStorage} = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data Submitted:', formData);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login-user",{
        method:"POST",
        headers:{
          "Content-Type":"Application/json"
        },
        body: JSON.stringify(formData)
      });
  
      const responseData = await response.json()
      console.log(responseData)
      if(response.ok){
        toast.success(responseData.message)
        SetTokenInLocalStorage(responseData.data)
        navigate("/dashboard/issues")
      }else{
        toast.error(responseData.message)
        throw new Error("Error in login opearation")
      }
    } catch (error) {
      console.log("Error in login opearation" ,error)
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
