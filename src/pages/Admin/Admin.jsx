

import React from "react";
import { useState ,useEffect} from "react";
import BikeStatusChart from "../../components/Admin/BikesStatusChart.jsx";
import RevenueChart from "../../components/Admin/RevenueChart.jsx";
import BikeManager from "../../components/Admin/BikeManagement.jsx";
import { DashboardIcon, SearchIcon, HomeIcon, BellIcon, SettingsIcon, AddIcon, EditIcon, DeleteIcon } from "../../components/Admin/Icons.jsx";
import { useSelector } from "react-redux";
const revenueData = [
  { date: "Nov 14", value: 5000 },
  { date: "Nov 15", value: 10000 },
  { date: "Nov 16", value: 8000 },
  { date: "Nov 17", value: 12000 },
  { date: "Nov 18", value: 15000 },
  { date: "Nov 19", value: 20000 },
];

const Admin= () => {
  
    const [bikesAtWork, setBikesAtWork] = useState(20);
    const [bikesDamaged, setBikesDamaged] = useState(5);
    const BikesData=useSelector((state) => state.bike.bikes);
    useEffect(() => {
      if(BikesData && BikesData.length > 0) {
        const atWork = BikesData.filter(bike => bike.available).length;
        const damaged = BikesData.filter(bike => !bike.available).length;
        setBikesAtWork(atWork);
        setBikesDamaged(damaged);
      }
    }, [BikesData]);
  const currentDateTime = "02:56 AM IST, Tuesday, May 27, 2025";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-white shadow flex flex-col items-center py-4">

        <div className="space-y-6">
          <DashboardIcon />
          <SearchIcon />
          <HomeIcon />
          <BellIcon />
          <SettingsIcon />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Overview</h1>
              <div className="flex space-x-2">
                <span className="text-gray-600">{currentDateTime}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">14 - 19 Jun</button>
              </div>
            </div> */}

        <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* New Clients Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">New clients</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">+118</p>
                <p className="text-green-500">+6.3% last day</p>
              </div>
              <div className="flex space-x-1">
                <div className="h-12 w-4 bg-blue-500 rounded"></div>
                <div className="h-8 w-4 bg-gray-200 rounded"></div>
                <div className="h-10 w-4 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </div>

          {/* Bike Status Section */}
          <BikeStatusChart bikesAtWork={bikesAtWork} bikesDamaged={bikesDamaged} />

          {/* Map Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Map</h2>
            <img src="https://www.shutterstock.com/shutterstock/photos/383685103/display_1500/stock-photo-montreal-canada-february-amsterdam-on-google-maps-app-under-magnifying-glass-383685103.jpg" />
          </div>
        </div>

        {/* Revenue Chart */}
        <RevenueChart revenueData={revenueData} />

        {/* Bike Management Section */}
        <BikeManager />
      </div>
    </div>
  );
};

export default Admin;