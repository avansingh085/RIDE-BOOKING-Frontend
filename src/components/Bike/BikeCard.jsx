import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bike, Calendar, Users, Fuel, Gauge, Disc, GitFork, Zap, DollarSign, Heart, Star, ChevronRight } from "lucide-react";

const BikeCard = ({ featured = false }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleRentClick = () => {
    navigate("/bike-details");
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${featured ? 'border-2 border-blue-500' : ''}`}>
     
      <div className="relative">
        {featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10 flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            Featured
          </div>
        )}
        
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={handleFavoriteClick}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isFavorite ? 'bg-red-50' : 'bg-white bg-opacity-80'
            } transition-colors duration-200`}
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} 
            />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        
        <img
          src="/bike-image.png"
          alt="Honda CBR Motorcycle"
          className="w-full h-56 object-cover object-center"
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <div className="flex items-center bg-white rounded-full px-2 py-1 text-xs font-medium">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            4.9
            <span className="text-gray-400 ml-1">(42)</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Honda CBR 650R</h2>
            <p className="text-sm text-gray-500">Sport Motorcycle</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">Per Hour</p>
            <p className="text-xl font-bold text-blue-600">$56</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-gray-500" />
            <span>2 Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Zap className="w-4 h-4 text-gray-500" />
            <span>500 Horsepower</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Fuel className="w-4 h-4 text-gray-500" />
            <span>Petrol</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Gauge className="w-4 h-4 text-gray-500" />
            <span>3000cc Engine</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Disc className="w-4 h-4 text-gray-500" />
            <span>Disc Brakes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <GitFork className="w-4 h-4 text-gray-500" />
            <span>6-Speed Gearbox</span>
          </div>
        </div>

        {/* Availability and action buttons */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">Available Now</span>
            </div>
            <span className="text-sm text-gray-500">40 kmpl avg</span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate("/bike-details")} 
              className="flex-1 text-sm px-3 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={handleRentClick}
              className="flex-1 text-sm px-3 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              Rent Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;