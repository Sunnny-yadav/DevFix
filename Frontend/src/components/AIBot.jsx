import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import { useUserContext } from '../context/auth.context';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; 

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");
    const { Token } = useUserContext();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const newMessage = { text: query, sender: "user" };
        setMessages([...messages, newMessage]);
        setQuery("");
        const toastId = toast.loading("Query under processing! Please wait...");

        try {
            const result = await fetch("http://localhost:8000/api/v1/bot/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Token
                },
                body: JSON.stringify(newMessage)
            });

            const response = await result.json();
            if (result.ok) {
                setMessages((prevData) => [...prevData, response.data]);
                toast.dismiss(toastId); // Stops the loading toast immediately
            } else {
                toast.error(response.message, { id: toastId });
                throw new Error("Query solving failed by Gemini API");
            }
        } catch (error) {
            console.error("AiBot :: handleSendMessage", error);
        }
    };

    const renderMessageContent = (text) => {
        // Check if text contains code blocks using triple backticks ```
        if (text.includes('```')) {
            return (
                <ReactMarkdown
                    children={text}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={materialDark}
                                    language={match[1]}
                                    PreTag="div"
                                    wrapLongLines={true} // Important for long code blocks
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                />
            );
        } else {
            return <ReactMarkdown>{text}</ReactMarkdown>;
        }
    };

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 font-sans">
            {/* Title & Instructions */}
            <h1 className="text-4xl font-extrabold text-green-400 mb-4 font-[Poppins]">AI Chat Support — Powered by Gemini</h1>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl text-center font-[Inter]">
                Facing a coding error? Describe your issue clearly and let Gemini assist you!
            </p>

            {/* Chat Container */}
            <div className="w-full max-w-5xl bg-gray-800 p-4 rounded-xl shadow-lg h-[500px] overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`max-w-[75%] p-3 my-1 rounded-lg text-white ${msg.sender === "user" ? "bg-green-600" : "bg-gray-700"}`}
                        >
                            {renderMessageContent(msg.text)}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="w-full fixed bottom-3 max-w-3xl flex items-center gap-2 mt-4">
                <input
                    type="text"
                    placeholder="Ask Gemini about your issue..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-3 rounded-md bg-gray-700 text-white outline-none"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={query === ""}
                    className="px-4 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all flex items-center gap-2"
                >
                    Send <FaPaperPlane />
                </button>
            </div>
        </div>
    );
}
