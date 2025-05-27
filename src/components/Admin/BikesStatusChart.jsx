import React from 'react';
const BikeStatusChart = ({ bikesAtWork, bikesDamaged }) => {
  const totalBikes = bikesAtWork + bikesDamaged;
  const atWorkPercent = (bikesAtWork / totalBikes) * 100;
  const damagedPercent = (bikesDamaged / totalBikes) * 100;

  const circumference = 2 * Math.PI * 58;
  const atWorkDash = (atWorkPercent / 100) * circumference;
  const damagedDash = (damagedPercent / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bike Status Overview</h2>
     <div className="flex flex-col md:flex-row items-center justify-around gap-6">
        {/* Chart */}
        <div className="relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <circle
              className="text-gray-200"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="70"
              cy="70"
            />
            <circle
              className="text-blue-500 transition-all duration-500 ease-out"
              strokeWidth="12"
              strokeDasharray={`${atWorkDash} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="70"
              cy="70"
            />
            <circle
              className="text-yellow-400 transition-all duration-500 ease-out"
              strokeWidth="12"
              strokeDasharray={`${damagedDash} ${circumference}`}
              strokeDashoffset={`-${atWorkDash}`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="70"
              cy="70"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700">{totalBikes}</span>
          </div>
        </div>

        {/* Legends */}
        <div className="space-y-3 text-sm font-medium text-gray-700">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
            Bikes at Work: <span className="ml-1 font-semibold">{bikesAtWork}</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></span>
            Bikes Damaged: <span className="ml-1 font-semibold">{bikesDamaged}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BikeStatusChart;
