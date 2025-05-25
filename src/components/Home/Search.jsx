import React, { useState } from 'react';

const LocationSearchForm = ({ containerStyles = {}, buttonStyles = {} }) => {
  const [dateRange, setDateRange] = useState('10/9/2020 - 14/9/2023');

  return (
    <div className="w-full p-2" style={containerStyles}>
      <div className="bg-white rounded-lg shadow p-6" >
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <div className="relative">
              <select className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Location</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Pick-UP</label>
            <div className="relative">
              <select className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Location</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <div className="relative">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <div className="flex items-center pl-3 text-gray-500">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="w-full py-2 px-2 text-gray-700 focus:outline-none" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div>
            <button 
              className="bg-black text-white font-medium py-2 px-8 rounded-md hover:bg-gray-800 transition duration-200"
              style={buttonStyles}
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchForm;

