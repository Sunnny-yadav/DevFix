import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIssueContext } from '../context/issue.context';



export default function IssuesList() {
  const navigate = useNavigate()
  const {getIssues, displayedIssue, issues} = useIssueContext();

  useEffect(()=>{
    if(issues.length === 0 ){
      getIssues()
    }
  },[]);


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-5xl font-extrabold text-green-400 mb-6 font-[Poppins]">Reported Issues</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-3xl text-center font-[Inter] leading-relaxed">
        Browse the list of reported issues by developers. Each card contains the error details along with code snippets to help analyze and debug the problem.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {displayedIssue?.map(issue => (
          <motion.div 
            key={issue._id} 
            className="bg-gray-800 p-5 rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold text-green-300 mb-3 font-[Poppins]">{issue.title}</h2>
            <div className="flex justify-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Error Screenshot</p>
                <img src={issue.errorImage} alt="Error Screenshot" className="w-32 h-32 rounded-md shadow-md" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Code Snippet</p>
                <img src={issue.codeSnippet} alt="Code Snippet" className="w-32 h-32 rounded-md shadow-md" />
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              onClick={()=> navigate(`/dashboard/${issue._id}/issue-details`)}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all font-[Poppins]"
            >
              View Details
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
