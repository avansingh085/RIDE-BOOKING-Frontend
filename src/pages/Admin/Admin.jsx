import React, { useState, useEffect } from "react";
import BikeStatusChart from "../../components/Admin/BikesStatusChart.jsx";
import RevenueChart from "../../components/Admin/RevenueChart.jsx";
import BikeManager from "../../components/Admin/BikeManagement.jsx";
import MessageList from "../../components/Admin/MessageList.jsx";
import { useSelector } from "react-redux";
import apiClient from "../../../utils/apiClient.js";
import PaymentPage from "../../components/Admin/Payment.jsx";
import BookingPage from "../../components/Admin/Booking.jsx";

const Admin = () => {
  const [bikesAtWork, setBikesAtWork] = useState(0);
  const [bikesDamaged, setBikesDamaged] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [registrationChange, setRegistrationChange] = useState({ yesterdayCount: 0, percentageChange: 0 });
  const [activeSection, setActiveSection] = useState("bike");

  const { profile } = useSelector((state) => state.user);
  const BikesData = useSelector((state) => state.bike.bikes);

  useEffect(() => {
    if (BikesData?.length > 0) {
      setBikesAtWork(BikesData.filter(bike => bike.available).length);
      setBikesDamaged(BikesData.filter(bike => !bike.available).length);
    }
  }, [BikesData]);

  useEffect(() => {
    const getRevenue = async () => {
      if (profile?.isAdmin) {
        try {
          const res = await apiClient.get('/user/revenue');
          if (res.status === 200) setRevenueData(res.data);
        } catch (err) {
          console.error("Revenue error:", err);
        }
      }
    };

    const getRegistrationChange = async () => {
      try {
        const res = await apiClient.get('/user/newUser');
        if (res.status === 200) setRegistrationChange(res.data);
      } catch (err) {
        console.error("Registration error:", err);
      }
    };

    getRevenue();
    getRegistrationChange();
  }, [profile]);

  const renderSection = () => {
    switch (activeSection) {
      case "bike":
        return <BikeManager />;
      case "messages":
        return <MessageList />;
        case "payment":
        return <PaymentPage/>
      default:
        return <BookingPage/>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* NAVBAR */}
     

      <div className="flex-1 p-6 overflow-auto">
        {/* Static cards section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Client Registration Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">New Clients</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {registrationChange?.yesterdayCount >= 0
                    ? `+ ${registrationChange.yesterdayCount}`
                    : `- ${Math.abs(registrationChange.yesterdayCount)}`}
                </p>
                <p className={`text-${registrationChange?.percentageChange >= 0 ? 'green' : 'red'}-500`}>
                  {registrationChange?.percentageChange >= 0
                    ? `+ ${registrationChange.percentageChange}`
                    : `- ${Math.abs(registrationChange.percentageChange)}`}%
                  {" "}last day
                </p>
              </div>
              <div className="flex space-x-1">
                <div className="h-12 w-4 bg-blue-500 rounded"></div>
                <div className="h-8 w-4 bg-gray-200 rounded"></div>
                <div className="h-10 w-4 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </div>

          {/* Bike Status Chart */}
          <BikeStatusChart bikesAtWork={bikesAtWork} bikesDamaged={bikesDamaged} />

          {/* Map Placeholder */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Map</h2>
            <img
              src="https://www.shutterstock.com/shutterstock/photos/383685103/display_1500/stock-photo-montreal-canada-february-amsterdam-on-google-maps-app-under-magnifying-glass-383685103.jpg"
              alt="Map"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        </div>

        {/* Revenue Chart */}
        <RevenueChart revenueData={revenueData} />
 <nav className="bg-white shadow px-4 py-3 mt-10">
  <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
        activeSection === "bike" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={() => setActiveSection("bike")}
    >
      Bikes
    </button>
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
        activeSection === "messages" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={() => setActiveSection("messages")}
    >
      Messages
    </button>
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
        activeSection === "payment" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={() => setActiveSection("payment")}
    >
      Payment
    </button>
    <button
      className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
        activeSection === "booking" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={() => setActiveSection("booking")}
    >
      Booking
    </button>
  </div>
</nav>

        {/* Dynamic Section */}
        <div className="mt-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
