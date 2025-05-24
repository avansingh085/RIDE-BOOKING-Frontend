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

function App() {
  const [count, setCount] = useState(0)

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
          <Route path="/profile" element={ <Layout>
            <ProfilePage />
          </Layout>} />
         
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App
