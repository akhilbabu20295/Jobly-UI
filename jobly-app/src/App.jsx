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


function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>   
    {!shouldHideNavbar && <Navbar />}
    <div className="container mt-5">
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
    </div>  
    <Footer/>
    </>
  )
}

export default App
