import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from "../src/context/auth.context.jsx"
import { IssueContextProvider } from "../src/context/issue.context.jsx"


createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <IssueContextProvider>
      <App />
      <Toaster position='top-right' />
    </IssueContextProvider>
  </UserContextProvider>

)
