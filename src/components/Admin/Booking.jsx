import React, { useEffect, useState } from "react";
import BookingList from "./BookingList"; // adjust path as needed
import apiClient from "../../../utils/apiClient";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
   
    apiClient.get("/booking/allBookings")
      .then((res) => {setBookings(res.data);
         console.log(res);
      })
      .catch((err) => console.error("Failed to load bookings", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <BookingList bookings={bookings} />
    </div>
  );
};

export default BookingPage;
