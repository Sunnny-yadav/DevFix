import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useIssueContext } from '../../context/issue.context';
import toast from 'react-hot-toast';


export default function IssueDetail() {
  const { id } = useParams();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { getIssueToBeViewed, viewIssue, fetchComments, setfetchedcomments, Token } = useIssueContext()

  const getAllcomments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/comments/${id}/get-comments`, {
        method: "GET",
        headers: {
          Authorization: Token
        }
      });

      const responseData = await response.json()
      if (response.ok) {
        setfetchedcomments(responseData.data)
      } else {
        throw new Error("Error occured while fetching comments")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const AddComment = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/comments/${id}/add-comment`, {
        method: "POST",
        headers: {
          Authorization: Token,
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({text:newComment})
      });

      const responseData = await response.json()
      if (response.ok) {
        setNewComment("")
        getAllcomments()
      } else {
        toast.error(responseData.message)
        throw new Error("Error occured while fetching comments")
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (id.length !== 0) {
      getIssueToBeViewed(id)
    }
  }, [id])


  useEffect(() => {
    if (showComments === true) {
      getAllcomments()
    }
  }, [showComments])

  const sendComment = ()=>{
    AddComment()
  }

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

            <img src={viewIssue?.errorImage} alt="Error Screenshot" className="w-32 h-32 rounded-md shadow-md" />
          </div>
          <div className="relative">

            <img src={viewIssue?.codeSnippet} alt="Code Snippet" className="w-32 h-32 rounded-md shadow-md" />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-green-300 mb-2 font-[Poppins]">{viewIssue?.title}</h2>
          <p className="text-md text-gray-300 mb-4 font-[Inter] leading-relaxed">{viewIssue?.description}</p>
          <p className="text-sm text-gray-400">Reported on: {new Date(viewIssue?.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Comments Section */}
      <button onClick={()=> setShowComments(!showComments)} className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className="w-full max-w-3xl bg-gray-800 p-6 mt-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-300 mb-4 font-[Poppins]">Comments</h2>
          <div className="space-y-3">
            {fetchComments?.map(comment => (
              <div key={comment._id} className="bg-gray-700 p-3 rounded-md shadow-md">
                <p className="text-sm text-gray-400 font-bold">{comment?.userId?.userName} <span className="text-xs text-green-500">({new Date(comment.createdAt).toLocaleTimeString()})</span></p>
                <p className="text-md text-gray-200">{comment?.text}</p>
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
            <button onClick={sendComment} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all">
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
                <img src={viewIssue?.errorImage} alt="Error Screenshot" className="w-full h-auto object-contain rounded-md shadow-md" />
              </div>
              <div className='w-1/2 h-auto max-h-[80vh] overflow-auto'>
                <img src={viewIssue?.codeSnippet} alt="Code Snippet" className="w-full h-auto object-contain rounded-md shadow-md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}