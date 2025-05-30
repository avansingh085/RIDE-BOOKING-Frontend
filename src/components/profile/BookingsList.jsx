import React, { useEffect, useState, useRef } from "react";
import { Calendar, Clock, MapPin, ArrowRight, ChevronRight, CheckCircle, Clock4, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollContainerRef = useRef(null);
  const {bikes}=useSelector((state)=>state.bike);
  const {profile}=useSelector((state)=>state.user);
  // Function to handle scrolling left/right
 useEffect(() => {
  if (!bikes || !profile) return;

  const userBookings = profile.bookings;

  const formattedBookings = userBookings.map((booking) => {
    const bike = bikes.find((b) => String(b._id) === String(booking.bikeId));
    console.log(bike);
    if (bike) {
      return {
        ...booking,
        bike: {
          name: bike.name,
          image: bike.image,
          model: bike.model
        },
        id: booking._id
      };
    }
    return null;
  }).filter(Boolean); // removes nulls

  setBookings(formattedBookings);
}, [bikes, profile]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Simulated fetch call with more diverse data
    // setBookings([
    //   {
    //     id: 1,
    //     bike: {
    //       name: "Yamaha MT-15",
    //       image: "https://cdn.pixabay.com/photo/2017/06/20/19/22/motorcycle-2424745_960_720.jpg",
    //       model: "2023",
    //     },
    //     location: "Mumbai Central",
    //     bookingDate: "2025-04-10",
    //     pickupTime: "2025-04-12T10:00:00",
    //     dropoffTime: "2025-04-12T18:00:00",
    //     status: "upcoming",
    //     price: "₹3,800",
    //     duration: "8 hours"
    //   },
    //   {
    //     id: 2,
    //     bike: {
    //       name: "Honda CBR 650R",
    //       image: "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg",
    //       model: "2024",
    //     },
    //     location: "Bandra West",
    //     bookingDate: "2025-04-05",
    //     pickupTime: "2025-04-15T09:00:00",
    //     dropoffTime: "2025-04-16T09:00:00",
    //     status: "upcoming",
    //     price: "₹12,500",
    //     duration: "24 hours"
    //   },
    //   {
    //     id: 3,
    //     bike: {
    //       name: "Royal Enfield Classic 350",
    //       image: "https://cdn.pixabay.com/photo/2018/10/26/22/55/harley-davidson-3775527_960_720.jpg",
    //       model: "2022",
    //     },
    //     location: "Andheri East",
    //     bookingDate: "2025-03-20",
    //     pickupTime: "2025-03-25T11:00:00",
    //     dropoffTime: "2025-03-25T19:00:00",
    //     status: "completed",
    //     price: "₹2,200",
    //     duration: "8 hours"
    //   },
    //   {
    //     id: 4,
    //     bike: {
    //       name: "KTM Duke 390",
    //       image: "https://cdn.pixabay.com/photo/2015/09/09/21/33/motorcycle-933022_960_720.jpg",
    //       model: "2023",
    //     },
    //     location: "Juhu",
    //     bookingDate: "2025-04-08",
    //     pickupTime: "2025-04-18T14:00:00",
    //     dropoffTime: "2025-04-19T14:00:00",
    //     status: "upcoming",
    //     price: "₹5,600",
    //     duration: "24 hours"
    //   },
    //   {
    //     id: 5,
    //     bike: {
    //       name: "Triumph Street Triple",
    //       image: "https://cdn.pixabay.com/photo/2016/06/13/08/56/motorcycle-1453863_960_720.jpg",
    //       model: "2024",
    //     },
    //     location: "Powai",
    //     bookingDate: "2025-03-15",
    //     pickupTime: "2025-03-18T10:00:00",
    //     dropoffTime: "2025-03-18T22:00:00",
    //     status: "completed",
    //     price: "₹8,200",
    //     duration: "12 hours"
    //   },
    // ]);
  }, []);

  const filteredBookings = activeFilter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === activeFilter);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Bookings Found</h3>
        <p className="text-sm text-gray-500 text-center">
          You haven't booked any bikes yet. Start exploring and book your first ride!
        </p>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded-md font-medium">
          Browse Bikes
        </button>
      </div>
    );
  }

  // Format date in a more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time in a more readable format
  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  // Get status badge properties
  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          icon: <Clock className="w-3 h-3" />,
          label: 'Upcoming'
        };
      case 'active':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          icon: <Clock4 className="w-3 h-3" />,
          label: 'Active'
        };
      case 'completed':
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          icon: <CheckCircle className="w-3 h-3" />,
          label: 'Completed'
        };
      default:
        return {
          bg: 'bg-red-50',
          text: 'text-red-600',
          icon: null,
          label: status
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and filter tabs */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <div className="flex space-x-2">
          {['all', 'upcoming', 'completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {activeFilter} bookings found.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Scroll buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-gray-200 hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-gray-200 hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x scroll-smooth gap-4 pb-4 pt-2 px-1 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredBookings?.map((booking) => {
              const statusBadge = getStatusBadge(booking.status);
              
              return (
                <div
                  key={booking.id}
                  className="flex-shrink-0 w-full sm:w-96 snap-start bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
                >
                  {/* Bike image header */}
                  <div className="relative h-48 group">
                    <img
                      src={booking.bike.image}
                      alt={booking.bike.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 p-4 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-xl font-bold text-white">{booking.bike.name}</h3>
                          <p className="text-sm text-gray-200">{booking.bike.model}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusBadge.bg} ${statusBadge.text}`}>
                          {statusBadge.icon}
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{booking.location}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{booking.price}</p>
                        <p className="text-xs text-gray-500">{booking.duration}</p>
                      </div>
                    </div>
                    
                    {/* Dates */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-3 h-3 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Pick-up</p>
                          <p>{formatDate(booking.pickupTime)}, {formatTime(booking.pickupTime)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Drop-off</p>
                          <p>{formatDate(booking.dropoffTime)}, {formatTime(booking.dropoffTime)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition">
                        View Details
                      </button>
                      
                      {booking.status === "upcoming" && (
                        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition">
                          Modify
                        </button>
                      )}
                      
                      {booking.status === "completed" && (
                        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition">
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Upcoming bookings summary */}
      {activeFilter === "all" && filteredBookings.filter(b => b.status === "upcoming").length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">
                You have {filteredBookings.filter(b => b.status === "upcoming").length} upcoming {
                  filteredBookings.filter(b => b.status === "upcoming").length === 1 ? 'booking' : 'bookings'
                }
              </h3>
              <p className="text-sm text-blue-600">
                Next booking: {formatDate(filteredBookings.filter(b => b.status === "upcoming")[0]?.pickupTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;