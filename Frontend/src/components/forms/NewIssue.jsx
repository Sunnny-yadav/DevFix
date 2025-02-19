import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RegisterIssue() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    errorImage: null,
    codeSnippet: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Issue Submitted:', formData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold text-green-400 mb-6 font-[Poppins]">Register a New Issue</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-3xl text-center font-[Inter] leading-relaxed">
        Fill in the details below to submit an issue. Attach screenshots and code snippets to help others understand the problem.
      </p>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input 
          type="text" 
          name="title" 
          placeholder="Issue Title" 
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          onChange={handleChange} 
          required 
        />
        
        <textarea 
          name="description" 
          placeholder="Describe the issue in detail..." 
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white h-32"
          onChange={handleChange} 
          required
        ></textarea>
        
        <label className="block text-gray-400">Upload Error Screenshot:</label>
        <input 
          type="file" 
          name="errorImage" 
          accept="image/*" 
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          onChange={handleFileChange} 
          required
        />
        
        <label className="block text-gray-400">Upload Code Snippet:</label>
        <input 
          type="file" 
          name="codeSnippet" 
          accept="image/*" 
          className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          onChange={handleFileChange} 
          required
        />
        
        <motion.button 
          type="submit" 
          className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Submit Issue
        </motion.button>
      </motion.form>
    </div>
  );
}
