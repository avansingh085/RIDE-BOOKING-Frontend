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
import { useDispatch, useSelector } from 'react-redux'
import { fetchBikes } from './redux/bike/bikeSlice'
import { fetchUser } from './redux/user/userSlice'
import { useEffect } from 'react'
import Loader from './pages/Loader/Loader'
import AdminProtectRoute from './components/Admin/AdminProtectRoute';
import UserProtectRoute from './components/profile/UserProtectRoute';
function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.user)
  useEffect(() => {

    dispatch(fetchBikes());
    dispatch(fetchUser());
  }, [authUser]);
console.log(authUser)
  if (loading) {
    return <Loader />
  }
  return (
    <div className='w-screen overflow-x-hidden' >
      <Routes>
        <Route path="/" element={<Layout>
          <Home />
        </Layout>} />
        <Route path="/bikes" element={<Layout>
          <Bikes />
        </Layout>} />
        <Route path="/bike-details/:bikeId" element={<Layout>
          <BikeBookingPage />
        </Layout>} />
        <Route path="/contact" element={<Layout>
          <Contact />
        </Layout>} />
        <Route path="/about" element={<Layout>
          <About />
        </Layout>} />
        <Route path="/privacy" element={<Layout>
          <PrivacyPolicy />
        </Layout>} />
        <Route path="/profile" element={<UserProtectRoute><Layout>
          <ProfilePage />
        </Layout></UserProtectRoute>} />
        <Route path="/settings" element={<Layout>
          <Settings />
        </Layout>} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminProtectRoute><Admin /></AdminProtectRoute>} />
      </Routes>
    </div>
  )
}

export default App
