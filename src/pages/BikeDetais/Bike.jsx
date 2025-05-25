import React, { use, useEffect, useState } from "react";
import { CalendarDays, MapPin, Heart, Clock, CheckCircle, XCircle, Clock1, Clock11 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../utils/apiClient";
import { fetchUser } from "../../redux/user/userSlice";

const BikeBookingPage = () => {
  const { bikeId } = useParams();

  const [location, setLocation] = useState("");
  const { bikes } = useSelector((state) => state.bike);
  const [bikeData, setBikeData] = useState();
const navigate=useNavigate();
const dispatch=useDispatch();
  useEffect(() => {
    if (bikes && bikeId) {
      const foundBike = bikes.find((bike) => String(bike._id) === String(bikeId));
      if (foundBike) {
        setBikeData(foundBike);
      }
    }
  }, [bikes, bikeId]);
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: null,
    pickupTime: null,
    dropoffDate: null,
    dropoffTime: null
  });

  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showPickupClock, setShowPickupClock] = useState(false);
  const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);
  const [showDropoffClock, setShowDropoffClock] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [validDuration, setValidDuration] = useState(null);
  const [duration, setDuration] = useState(0);
  const hourlyRate = 4.73;


  const total = (duration * hourlyRate).toFixed(2);
  const combineDateAndTime = (date, time) => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
  };
  // calculate duration hourse
  const calculateDurationInHours = (start, end) => {
    if (!start || !end) return 0;
    const durationMs = end - start;
    const durationHours = durationMs / (1000 * 60 * 60); // convert ms to hours
    return parseFloat(durationHours.toFixed(2));
  };
  // handle valid duration
  useEffect(() => {
    if (selectedDates.dropoffDate && selectedDates.pickupDate && selectedDates.dropoffTime && selectedDates.pickupTime) {
      const startTime = combineDateAndTime(selectedDates.pickupDate, selectedDates.pickupTime);
      const endTime = combineDateAndTime(selectedDates.dropoffDate, selectedDates.dropoffTime);
      if (new Date(startTime) <= new Date(endTime)) {
        setDuration(calculateDurationInHours(startTime, endTime));
        setValidDuration("ok");
      }
      else {
        setValidDuration("not");
        setDuration(0);
      }

    }
    else {
      setDuration(0);
      setValidDuration(null);
    }
    setIsAvailable(null);
  }, [selectedDates])
  const handleCheckAvailability = async () => {
    setIsChecking(true);
    setIsAvailable(null);
    try {
      const startTime = combineDateAndTime(selectedDates.pickupDate, selectedDates.pickupTime);

      const endTime = combineDateAndTime(selectedDates.dropoffDate, selectedDates.dropoffTime);


      const res = await apiClient.post(`/booking/checkAvailability`, { bikeId, startTime, endTime });
      setIsAvailable(res.data.available);
    }
    catch (err) {
      console.log(err, "during checkAvailability");
    }
    finally {
      setIsChecking(false);
    }

  };
 const handleBooking = async () => {
  try {
    const startTime = combineDateAndTime(selectedDates.pickupDate, selectedDates.pickupTime);
    const endTime = combineDateAndTime(selectedDates.dropoffDate, selectedDates.dropoffTime);
     navigate('/profile'); 
    const bookingRes = await apiClient.post('/booking/bookBike', {
      bikeId,
      startTime,
      endTime,
      location,
    });

    dispatch(fetchUser());
     
  } catch (err) {
    console.log(err,"order not booking");
  }
};


  // Helper function to format date as DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper function to format time as HH:MM AM/PM
  const formatTime = (time) => {
    if (!time) return "";
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  // Generate days for the calendar
  const generateCalendarDays = (currentDate = new Date()) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add empty spaces for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  // Calendar component
  const Calendar = ({ onSelect, onClose, type }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const days = generateCalendarDays(currentMonth);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    return (
      <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <div key={index} className="py-1">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((day, index) => (
            <div
              key={index}
              className={`p-1 ${!day ? "" : "hover:bg-gray-100 cursor-pointer"} ${day && day.getDate() === new Date().getDate() &&
                day.getMonth() === new Date().getMonth() &&
                day.getFullYear() === new Date().getFullYear() ? "bg-gray-200 rounded-full" : ""
                }`}
              onClick={() => {
                if (day) {
                  setSelectedDates(prev => ({
                    ...prev,
                    [type === 'pickup' ? 'pickupDate' : 'dropoffDate']: day
                  }));
                  onClose();
                  onSelect(day);
                }
              }}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
        <div className="mt-3 text-right">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Clock component
  const Clock = ({ onSelect, onClose, type }) => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = ["00", "15", "30", "45"];
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedMinute, setSelectedMinute] = useState(null);
    const [selectedAmPm, setSelectedAmPm] = useState("AM");

    const handleTimeSelection = () => {
      if (selectedHour !== null && selectedMinute !== null) {
        const hour = selectedAmPm === "PM" && selectedHour !== 12
          ? selectedHour + 12
          : (selectedAmPm === "AM" && selectedHour === 12 ? 0 : selectedHour);

        const newTime = new Date();
        newTime.setHours(hour);
        newTime.setMinutes(parseInt(selectedMinute));
        newTime.setSeconds(0);

        setSelectedDates(prev => ({
          ...prev,
          [type === 'pickup' ? 'pickupTime' : 'dropoffTime']: newTime
        }));

        onSelect(newTime);
        onClose();
      }
    };

    return (
      <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
        <div className="text-center mb-3 font-medium">Select Time</div>
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Hour</div>
          <div className="grid grid-cols-4 gap-2">
            {hours.map(hour => (
              <button
                key={hour}
                className={`p-2 text-center rounded ${selectedHour === hour ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Minute</div>
          <div className="grid grid-cols-4 gap-2">
            {minutes.map(minute => (
              <button
                key={minute}
                className={`p-2 text-center rounded ${selectedMinute === minute ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedMinute(minute)}
              >
                {minute}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">AM/PM</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-2 text-center rounded ${selectedAmPm === "AM" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              onClick={() => setSelectedAmPm("AM")}
            >
              AM
            </button>
            <button
              className={`p-2 text-center rounded ${selectedAmPm === "PM" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              onClick={() => setSelectedAmPm("PM")}
            >
              PM
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleTimeSelection}
            disabled={selectedHour === null || selectedMinute === null}
            className={`px-3 py-1 rounded text-sm ${selectedHour !== null && selectedMinute !== null
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Set Time
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Bike Name and Info Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{bikeData?.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Melbourne, Australia</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <button className="px-4 py-2 flex items-center gap-2 border rounded-md hover:bg-gray-50">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Save</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Section - Images */}
        <div className="md:col-span-7">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <img
              src={bikeData?.image}
              alt="BMW M2 Motorcycle"
              className="w-full object-contain rounded h-64"
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {bikeData?.view?.map((i) => (
              <img
                key={i}
                src={i}
                alt={`BMW M2 view ${i}`}
                className="w-24 h-24 object-cover rounded-md border cursor-pointer hover:opacity-90 transition"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="md:col-span-5">
          <div className="bg-white rounded-xl p-6 border shadow-sm sticky top-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">Book Your Ride</h2>
                <div className="text-sm text-gray-500 mt-1">${hourlyRate}/hour</div>
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-sm text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span>Available</span>
              </div>
            </div>

            <div className="space-y-5">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Pick-up Location
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              {/* Dates and Times */}
              <div className="grid grid-cols-2 gap-4">
                {/* Pick-Up Date */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Pick-Up Date
                    </div>
                  </label>
                  <button
                    onClick={() => {
                      setShowPickupCalendar(!showPickupCalendar);
                      setShowPickupClock(false);
                      setShowDropoffCalendar(false);
                      setShowDropoffClock(false);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <span className={selectedDates.pickupDate ? "" : "text-gray-400"}>
                      {selectedDates.pickupDate ? formatDate(selectedDates.pickupDate) : "Select Date"}
                    </span>
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                  </button>
                  {showPickupCalendar && (
                    <Calendar
                      onSelect={(date) => {
                        setSelectedDates(prev => ({ ...prev, pickupDate: date }));
                      }}
                      onClose={() => setShowPickupCalendar(false)}
                      type="pickup"
                    />
                  )}
                </div>
                {/* Pick-Up Time */}
                {/*                 <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Clock  onSelect={() => { setShowPickupClock(!showPickupClock); }} onClose={() => setShowPickupClock(false)}    className="w-4 h-4" />
                      Pick-Up Time
                    </div>
                  </label>
                  <button
                    onClick={() => {
                      setShowPickupClock(!showPickupClock);
                      setShowPickupCalendar(false);
                      setShowDropoffCalendar(false);
                      setShowDropoffClock(false);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <span className={selectedDates.pickupTime ? "" : "text-gray-400"}>
                      {selectedDates.pickupTime ? formatTime(selectedDates.pickupTime) : "Select Time"}
                    </span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </button>
                  {showPickupClock && (
                    <Clock 
                      onSelect={(time) => {
                        setSelectedDates(prev => ({ ...prev, pickupTime: time }));
                      }}
                      onClose={() => setShowPickupClock(false)}
                      type="pickup"
                    />
                  )}
                </div> */}
                {/* Drop-Off Date */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Drop-Off Date
                    </div>
                  </label>
                  <button
                    onClick={() => {
                      setShowDropoffCalendar(!showDropoffCalendar);
                      setShowPickupCalendar(false);
                      setShowPickupClock(false);
                      setShowDropoffClock(false);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <span className={selectedDates.dropoffDate ? "" : "text-gray-400"}>
                      {selectedDates.dropoffDate ? formatDate(selectedDates.dropoffDate) : "Select Date"}
                    </span>
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                  </button>
                  {showDropoffCalendar && (
                    <Calendar
                      onSelect={(date) => {
                        setSelectedDates(prev => ({ ...prev, dropoffDate: date }));
                      }}
                      onClose={() => setShowDropoffCalendar(false)}
                      type="dropoff"
                    />
                  )}
                </div>
                {/* Drop-Off Time */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Clock1 className="w-4 h-4" />
                      Pick-Up Time
                    </div>
                  </label>

                  {showPickupClock && (
                    <Clock
                      type="pickup"
                      onSelect={(time) => {
                        setSelectedDates((prev) => ({ ...prev, pickupTime: time }));
                        setShowPickupClock(false);
                      }}
                      onClose={() => setShowPickupClock(false)}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setShowPickupClock(!showPickupClock);
                      setShowPickupCalendar(false);
                      setShowDropoffClock(false);
                      setShowDropoffCalendar(false);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <span className={selectedDates.pickupTime ? "" : "text-gray-400"}>
                      {selectedDates.pickupTime ? formatTime(selectedDates.pickupTime) : "Select Time"}
                    </span>
                  </button>
                </div>

                <div className="relative mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Clock11 className="w-4 h-4" />
                      Drop-Off Time
                    </div>
                  </label>

                  {showDropoffClock && (
                    <Clock
                      type="dropoff"
                      onSelect={(time) => {
                        setSelectedDates((prev) => ({ ...prev, dropoffTime: time }));
                        setShowDropoffClock(false);
                      }}
                      onClose={() => setShowDropoffClock(false)}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setShowDropoffClock(!showDropoffClock);
                      setShowPickupClock(false);
                      setShowPickupCalendar(false);
                      setShowDropoffCalendar(false);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                  >
                    <span className={selectedDates.dropoffTime ? "" : "text-gray-400"}>
                      {selectedDates.dropoffTime ? formatTime(selectedDates.dropoffTime) : "Select Time"}
                    </span>
                  </button>
                </div>
              </div>
              {/* Cost Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{duration} Hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rate</span>
                  <span className="font-medium">${hourlyRate}/hour</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-lg font-bold">${total}</span>
                </div>
              </div>

              {/* Check Availability Button */}
              <button
                onClick={handleCheckAvailability}
                disabled={validDuration === "not"}
                className={`w-full  py-3 rounded-md font-medium  transition ${validDuration === "ok" ? "bg-black text-white" : "bg-gray-200 text-black"}`}
              >
                {isChecking ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Checking Availability...</span>
                  </div>
                ) : (
                  "Check Availability"
                )}
              </button>
              {
                validDuration === "not" ? <div className="text-red-500">please enter valid date</div> : ""
              }

              {/* Status Message */}
              {isAvailable !== null && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                  {isAvailable ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Bike is available for your selected dates!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>Bike is not available for the selected time.</span>
                    </>
                  )}
                </div>
              )}

              {/* Confirm Booking Button */}
              <button
                disabled={!isAvailable}
                className={`w-full py-3 rounded-md font-semibold ${isAvailable
                  ? "bg-black text-white hover:bg-gray-800 transition"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                onClick={handleBooking}
              >
                CONFIRM BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bike Info Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Description */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This Motorcycle</h2>
          <p className="text-gray-600 leading-relaxed">
            {
              bikeData?.about
            }
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
            <ul className="grid grid-cols-2 gap-2">
              {
                bikeData?.features?.map((data, key) => {
                  return (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{data}</span>
                    </li>
                  )
                })
              }

            </ul>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
          <div className="grid grid-cols-1 gap-4">
            {
              bikeData?.specifications?.map((data) => <Spec label={data.key} value={data.value} />)
            }

          </div>
        </div>
      </div>
      
    </div>
  );
};

const Spec = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default BikeBookingPage;