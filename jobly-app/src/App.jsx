import { useState } from 'react'
import { Routes, Route,useLocation  } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/Signup'
import Landing from './components/Landing'
import Footer from './components/Footer';
import UserProfile from './user/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetail from './components/JobDetail';
import JobList from './components/JobList';
import ForgotPassword from './components/ForgotPassword';
import "bootstrap-icons/font/bootstrap-icons.css";
import PostJobs from './recruiter/PostJobs';
import ListJobs from './recruiter/ListJobs';


function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>   
    {/* {!shouldHideNavbar && <Navbar />} */}
    <div className="container mt-5">
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/post-jobs" element={<PostJobs />} />
           <Route path="/list-jobs" element={<ListJobs />} />
        </Routes>
    </div>  
   {/* // <Footer/> */}
    </>
  )
}

export default App
