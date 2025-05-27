import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/auth/login/Login'
import Home from './pages/home/Home'
import NavBar from './components/common/NavBar'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/common/Layout'
import Bikes from './pages/Bikes/Bikes'
import BikeDetailsPage from './pages/Bikes/BikeDetails'
import BikeBookingPage from './pages/BikeDetais/Bike'
import ProfilePage from './pages/Profile/ProfilePage'
import Contact from './components/contact/contact'
import About from './components/about/about'
import PrivacyPolicy from './components/privacyPolicy/privacyPolicy'
import Settings from './components/Settings/Settings'
import Admin from './pages/Admin/Admin'
import { useDispatch,useSelector } from 'react-redux'
import { fetchBikes } from './redux/bike/bikeSlice'
import { fetchUser } from './redux/user/userSlice'
import { useEffect } from 'react'
import Loader from './pages/Loader/Loader'
function App() {
  const [count, setCount] = useState(0)
  const dispatch=useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const {loading}=useSelector((state)=>state.user)
  useEffect(() => {
     
      dispatch(fetchBikes());
      dispatch(fetchUser());
    }, [authUser]);
   
   if(loading)
   {
    return <Loader/>
   }
  return (
    <>
     <Routes>
      <Route path="/" element={ <Layout>
            <Home />
          </Layout>} />
          <Route path="/bikes" element={ <Layout>
            <Bikes />
          </Layout>} />
          <Route path="/bike-details/:bikeId" element={ <Layout>
            <BikeBookingPage />
          </Layout>} />
          <Route path="/contact" element={<Layout>
            <Contact/>
          </Layout>}/>
           <Route path="/about" element={<Layout>
            <About/>
          </Layout>}/>
           <Route path="/privacy" element={<Layout>
            <PrivacyPolicy/>
          </Layout>}/>
          <Route path="/profile" element={ <Layout>
            <ProfilePage />
          </Layout>} />
          <Route path="/settings" element={ <Layout>
            <Settings />
          </Layout>} />
         
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
    </>
  )
}

export default App
