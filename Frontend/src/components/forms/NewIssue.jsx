import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {useUserContext}  from "../../context/auth.context.jsx"
import { useIssueContext } from '../../context/issue.context.jsx';

export default function RegisterIssue() {
  const [issueData, setissueData] = useState({
    title: '',
    description: '',
    errorImage: null,
    codeSnippet: null
  });
  const navigate = useNavigate()
  const {Token} = useUserContext()
  const {addNewIssueToList} = useIssueContext()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setissueData({ ...issueData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setissueData({ ...issueData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const formData = new FormData()
    for (const key in issueData) {
      formData.append(key, issueData[key])
    };

    try {
      const toastId = toast.loading("Raising issue under process")
      const respone = await fetch("http://localhost:8000/api/v1/issues/register-issue", {
        method: "POST",
        headers: {
          Authorization: Token
        },
        body: formData
      });

      const responseData = await respone.json()
      console.log(responseData)
      if (respone.ok) {
        addNewIssueToList(responseData.data)
        toast.success(responseData.message, {id:toastId});
        navigate("/dashboard/issues")
      } else {
        toast.error(responseData.message, {id:toastId})
        throw new Error("Error Occured while Registering Issue")
      }
    } catch (error) {
      console.log(error)
    }
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
