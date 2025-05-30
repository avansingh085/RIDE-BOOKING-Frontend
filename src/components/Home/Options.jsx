import React from 'react';
import car from '../../assets/car_one.png';
import cars from '../../assets/car2.png';

const RentOptions = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4">Rent A Car</h2>
          <p className="text-gray-600 mb-6">
            Booking a self-driving car with us is simple and easy. You can browse our 
            selection of vehicle series, choose the car that best fits your needs, and 
            rent it for the duration of your choice. Our user-friendly platform allows 
            you to manage your bookings and view your trip history with ease.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
            RENT CAR
          </button>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src={car} 
            alt="Happy man in car giving thumbs up" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div>
          <img 
            src={cars}
            alt="People looking at motorcycles in showroom" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Rent A Bike</h2>
          <p className="text-gray-600 mb-6">
            Booking a self-driving car with us is simple and easy. You can browse our 
            selection of vehicle series, choose the car that best fits your needs, and 
            rent it for the duration of your choice. Our user-friendly platform allows 
            you to manage your bookings and view your trip history with ease.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
            RENT BIKE
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-lg">
        <div>
          <h2 className="text-3xl font-bold mb-4">Do You Want To Share Your Vehicle?</h2>
          <p className="text-gray-600 mb-6">
            We'll Give Your Car Location To Calculate Your Ultimate Bonus. Each ZIP Code 
            We Bring In One Of Four Zones. Zones Are Based On Driver Demand For Cars—
            The Higher The Demand For Cars In Your Zone, The More Bonuses You'll Get. 
            Gets The Highest Bonus. While Zones 3 And 4 Aren't Eligible For The Onboard 
            Bonus.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition flex items-center">
            LEARN MORE
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div>
          <img 
            src="https://media.gettyimages.com/id/1387193426/photo/car-salesmen-and-saleswoman-discussing-over-digital-tablet-while-laughing.jpg?s=612x612&w=0&k=20&c=FcXqxLRmc6eCi_d4B3I7Umxwq23xY4stpPxHAJlzkQM=" 
            alt="Business man with clipboard near car" 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RentOptions;