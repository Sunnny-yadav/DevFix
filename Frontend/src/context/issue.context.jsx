import { createContext, useState } from "react";
import { useContext } from "react";
import { useUserContext } from "./auth.context";
import toast from 'react-hot-toast'

const issueContext = createContext()

export const IssueContextProvider = ({ children }) => {

    const { Token, userData } = useUserContext();
    const [issues, setissues] = useState([])
    const [displayedIssue, setdisplayedIssue] = useState([])
    const [viewIssue, setviewIssue] = useState({})
    const [fetchComments, setfetchedcomments] = useState([]);


    const getIssues = async () => {
        try {
            const toastId = toast.loading("Fetching the issues")
            const response = await fetch("http://localhost:8000/api/v1/issues/get-issuesList", {
                method: "GET",
            });

            const responseData = await response.json()
            if (response.ok) {
                setissues(responseData.data)
                setdisplayedIssue(responseData.data)
                toast.dismiss(toastId);
            } else {
                toast.error(responseData.message, { id: toastId })
                throw new Error("Error while fetching issues from server")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addNewIssueToList = (data) => {
        setdisplayedIssue((prev) => [data, ...prev])
        setissues((prev) => [data, ...prev])
    };

    const getIssueToBeViewed = (id) => {
        const data = displayedIssue.filter((issue) => issue._id === id)
        setviewIssue(data[0]);
    };

    const showAllIssues = ()=>{
        setdisplayedIssue(issues)
    }

    const showPersonalIssues = ()=>{
        const data = issues.filter((issue)=> issue.userId === userData._id);
        setdisplayedIssue(data)
    }

    return (
        <issueContext.Provider value={{
            getIssues,
            displayedIssue,
            issues,
            addNewIssueToList,
            getIssueToBeViewed,
            viewIssue, fetchComments,
            setfetchedcomments,
            Token,
            showAllIssues,
            showPersonalIssues
        }}>
            {children}
        </issueContext.Provider>
    )
};

export const useIssueContext = () => {
    return useContext(issueContext);
}