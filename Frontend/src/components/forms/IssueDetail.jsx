import { useParams } from 'react-router-dom';
import { useState } from 'react';

const issue = {
  id: 1,
  title: 'Syntax Error in JavaScript',
  description: 'This error occurs when there is an incorrect syntax in JavaScript. Common causes include missing semicolons, incorrect brackets, or mistyped keywords.',
  date: 'March 5, 2024',
  errorImage: 'https://user-images.githubusercontent.com/33995028/138409124-6928fe35-1ffd-43aa-96aa-c950b84640d1.png',
  codeSnippet: 'https://www.researchgate.net/publication/335351970/figure/fig5/AS:795048484536323@1566565738552/Code-snippet-implementing-the-check-ifA-B0.jpg'
};

export default function IssueDetail() {
  const { id } = useParams();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    // Simulate API call
    setComments([
      { id: 1, user: 'Alice', text: 'You might have missed a semicolon at the end of line 5.', time: '10:30 AM' },
      { id: 2, user: 'Bob', text: 'Try checking the variable declaration syntax.', time: '11:15 AM' }
    ]);
    setShowComments(!showComments);
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-green-400 mb-4 font-[Poppins]">Issue Details</h1>
      <p className="text-lg text-gray-300 mb-6 max-w-3xl text-center font-[Inter] leading-relaxed">
        Below is a detailed view of the reported issue, including the error screenshot, code snippet, and developer’s description.
      </p>
      
      <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
        {/* Left Side - Images */}
        <div className="flex flex-col gap-4 items-center">
        <button onClick={() => setPopupOpen(true)} className=" px-4 py-2 bg-green-600 text-white text-xs rounded-md font-semibold font-serif hover:bg-green-700">View Snippet</button>
          <div className="relative">
           
            <img src={issue.errorImage} alt="Error Screenshot" className="w-32 h-32 rounded-md shadow-md" />
          </div>
          <div className="relative">
            
            <img src={issue.codeSnippet} alt="Code Snippet" className="w-32 h-32 rounded-md shadow-md" />
          </div>
        </div>
        
        {/* Right Side - Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-green-300 mb-2 font-[Poppins]">{issue.title}</h2>
          <p className="text-md text-gray-300 mb-4 font-[Inter] leading-relaxed">{issue.description}</p>
          <p className="text-sm text-gray-400">Reported on: {issue.date}</p>
        </div>
      </div>
      
      {/* Comments Section */}
      <button onClick={fetchComments} className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="w-full max-w-3xl bg-gray-800 p-6 mt-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-300 mb-4 font-[Poppins]">Comments</h2>
          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className="bg-gray-700 p-3 rounded-md shadow-md">
                <p className="text-sm text-gray-400 font-bold">{comment.user} <span className="text-xs text-green-500">({comment.time})</span></p>
                <p className="text-md text-gray-200">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 bg-white p-2 rounded-md">
            <input
              type="text"
              className="flex-1 p-2 rounded-md text-black outline-none"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all">
              ➤
            </button>
          </div>
        </div>
      )}
      
      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg relative w-11/12 max-w-5xl max-h-[90vh] overflow-hidden">
            <button onClick={() => setPopupOpen(false)} className="absolute top-2 right-2 text-white text-lg">✖</button>
            <div className="flex gap-4 justify-center overflow-auto max-h-[80vh]">
              <div className='w-1/2 h-auto max-h-[80vh] overflow-auto'>
                <img src={issue.errorImage} alt="Error Screenshot" className="w-full h-auto object-contain rounded-md shadow-md" />
              </div>
              <div className='w-1/2 h-auto max-h-[80vh] overflow-auto'>
                <img src={issue.codeSnippet} alt="Code Snippet" className="w-full h-auto object-contain rounded-md shadow-md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}