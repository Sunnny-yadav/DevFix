import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from "../src/context/auth.context.jsx"

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
   <App />
   <Toaster position='top-right'/>
  </UserContextProvider>
)
