import React, { useState } from "react";
import { CalendarDays, MapPin, Heart } from "lucide-react";

const BikeDetailsPage = () => {
  const [location, setLocation] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const hourlyRate = 4.73;
  const duration = 7.75;
  const total = (duration * hourlyRate).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="border rounded-xl p-4">
            <img
              src="/yamaha-blue.png"
              alt="Bike"
              className="w-full object-contain rounded"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {["/img1.png", "/img2.png", "/img3.png"].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
        <div className="bg-[#f5f3ef] rounded-xl p-6 relative">
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow">
            <Heart className="w-5 h-5 text-gray-500" />
          </button>
          <div className="space-y-4">
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4" />
                Location
              </span>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </label>

            {/* Pick-Up & Drop-Off */}
            <div className="flex gap-4">
              {/* Pickup */}
              <label className="w-1/2">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CalendarDays className="w-4 h-4" />
                  Pick-Up
                </span>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border rounded-md"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="12.30 PM"
                    className="w-24 px-3 py-2 border rounded-md"
                  />
                </div>
              </label>

              {/* Dropoff */}
              <label className="w-1/2">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CalendarDays className="w-4 h-4" />
                  Drop-Off
                </span>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border rounded-md"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="12.30 PM"
                    className="w-24 px-3 py-2 border rounded-md"
                  />
                </div>
              </label>
            </div>

            {/* Duration & Total */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold">{duration} Hours</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total</span>
              <span className="text-lg font-bold">${total}</span>
            </div>

            {/* Button */}
            <button className="mt-4 w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>

      {/* Bike Info */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">BMW M2 2020</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">
            The BMW M2 is the high-performance version of the 2 Series 2-door
            coupé. The first generation of the M2 is the F87 coupé and is powered
            by turbocharged.
          </p>
        </div>

        {/* Specs Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-700">
            <Spec label="Ground Clearance" value="170 Mm" />
            <Spec label="Engine Display" value="155 Cc" />
            <Spec label="Fuel Type" value="Petrol" />
            <Spec label="Wheels Type" value="Alloy" />
            <Spec label="Emission Type" value="BS6-2.0" />
            <Spec label="Mileage" value="40 Kmpl" />
            <Spec label="Gear Box" value="6-Speed" />
            <Spec label="ABS" value="Dual Channel" />
            <Spec label="Type Type" value="Tubeless" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Spec = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default BikeDetailsPage;
