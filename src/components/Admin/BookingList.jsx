import React, { useState } from "react";
import moment from "moment";

const statusColors = {
  upcoming: "bg-yellow-100 text-yellow-800",
  ongoing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const BookingList = ({ bookings }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const bookingId = booking._id.toLowerCase();
    const bikeId = booking?.bikeId?._id?.toLowerCase() || "";
    const bikeName = booking?.bikeId?.name?.toLowerCase() || "";

    return (
      bookingId.includes(searchTerm.toLowerCase()) ||
      bikeId.includes(searchTerm.toLowerCase()) ||
      bikeName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      {/* Search input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search Booking ID or Bike ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
      </div>

      {/* Booking grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full">
            No matching bookings.
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking?.bikeId?.name || "Bike"}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                📍 <span className="font-medium">{booking.location}</span>
              </p>

              <p className="text-sm text-gray-600">
                📅 Booking Date:{" "}
                <span className="font-medium">
                  {moment(booking.bookingDate).format("LLL")}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                ⏰ Pickup:{" "}
                <span className="font-medium">
                  {moment(booking.pickupTime).format("LLL")}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                ⏱️ Dropoff:{" "}
                <span className="font-medium">
                  {moment(booking.dropoffTime).format("LLL")}
                </span>
              </p>

              <p className="text-sm text-gray-600 mt-2">
                💸 Price:{" "}
                <span className="font-semibold text-black">
                  ₹{booking.price.toFixed(2)}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                ⌛ Duration:{" "}
                <span className="font-medium">{booking.duration} hrs</span>
              </p>

              <p className="text-xs text-gray-400 mt-4 break-words">
                Booking ID: <span className="font-mono">{booking._id}</span>
                <br />
                Bike ID: <span className="font-mono">{booking.bikeId?._id}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;
