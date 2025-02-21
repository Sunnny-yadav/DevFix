import {  createContext, useState } from "react";
import { useContext } from "react";
import { useUserContext } from "./auth.context";
import toast from 'react-hot-toast'

const issueContext = createContext()

export const IssueContextProvider = ({children})=>{

    const {Token} = useUserContext();
    const [issues, setissues] = useState([])
    const [displayedIssue, setdisplayedIssue] = useState([])
    const [viewIssue, setviewIssue] = useState({})


    const getIssues = async ()=>{
        try {
            const toastId = toast.loading("Fetching the issues")
            const response = await fetch("http://localhost:8000/api/v1/issues/get-issuesList",{
                method:"GET", 
            });

            const responseData = await response.json()
            if(response.ok){
                setissues(responseData.data)
                setdisplayedIssue(responseData.data)
                toast.dismiss(toastId); 
            }else{
                toast.error(responseData.message, {id:toastId})
                throw new Error ("Error while fetching issues from server")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addNewIssueToList = (data)=>{
        setdisplayedIssue((prev)=> [data, ...prev])
        setissues((prev)=> [data, ...prev])
    };

    const getIssueToBeViewed = (id)=>{
        const data = displayedIssue.filter((issue)=> issue._id === id)
        setviewIssue(data[0]);
    };

    return (
        <issueContext.Provider value={{getIssues, displayedIssue, issues, addNewIssueToList, getIssueToBeViewed, viewIssue}}>
        {children}
        </issueContext.Provider>
    )
};

export const useIssueContext = ()=>{
    return useContext(issueContext);
}