import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom'
import './App.css'
import IssueDetail from './components/forms/IssueDetail'
import LoginForm from './components/forms/Login'
import RegisterIssue from './components/forms/NewIssue'
import RegistrationForm from './components/forms/Registration'
import IntroductionPage from './components/IntroductionPage'
import IssuesList from './components/IssuesList'
import Navbar from './components/NavBar'
import ChatInterface from './components/AIBot'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<IntroductionPage />} />
      <Route path='/register-user' element={<RegistrationForm />} />
      <Route path='/login' element={<LoginForm />} />


      <Route path='/dashboard' element={<Navbar />}>
        <Route path='/dashboard/issues' element={<IssuesList />} />
        <Route path='/dashboard/register-issue' element={<RegisterIssue />} />
        <Route path='/dashboard/:id/issue-details' element={<IssueDetail />} />
        <Route  path="/dashboard/AI-interface" element={<ChatInterface/>}  />
      </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
