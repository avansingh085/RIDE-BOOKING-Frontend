import React, { useState, useEffect } from "react";
import { Filter, ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import FilterBar from "../../components/Bike/BikeFilter";
import BikeHero from "../../components/Bike/BikeHero";
import BikeCard from "../../components/Bike/BikeCard";
import { useSelector } from "react-redux";

const Bikes = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 8;

  const bikesData = useSelector((state) => state.bike.bikes);

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    // Simulate API call with loading state
    setIsLoading(true);
    setTimeout(() => {
      setBikes(bikesData);
      setIsLoading(false);
    }, 800);
  }, [bikesData]);

  // Calculate pagination
 const totalBikes = bikes?.length || 0;

const indexOfLastBike = currentPage * itemsPerPage;
const indexOfFirstBike = indexOfLastBike - itemsPerPage;

// Always check that bikes is an array before slicing
const currentBikes = Array.isArray(bikes)
  ? bikes.slice(indexOfFirstBike, indexOfLastBike)
  : [];

const totalPages = Math.ceil(totalBikes / itemsPerPage);


  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: document.getElementById('bikes-grid').offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <BikeHero />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="translate-y-[-50px]">
          <FilterBar isOpen={isFilterOpen} onToggle={() => setIsFilterOpen(!isFilterOpen)} />
        </div>

        {/* Toolbar with view toggle and sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Available Bikes</h1>
            <p className="text-sm text-gray-500 mt-1">
              {bikes ? bikes.length : 0} bikes available for rent
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-gray-300">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded ${view === "grid" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded ${view === "list" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                id="sort"
                className="text-sm border-gray-300 rounded-md px-3 py-1.5 focus:ring-black focus:border-black"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="fixed bottom-4 right-4 sm:hidden z-20">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-black text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Show filters"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Bikes Grid */}
      <div id="bikes-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden aspect-square animate-pulse">
                <div className="bg-gray-200 h-1/2 w-full"></div>
                <div className="p-4 h-1/2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBikes.map((bike) => (
              <div key={bike.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {bike.featured && (
                    <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                    <div className="text-xl font-bold text-white">${bike.pricePerHour}/hr</div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{bike.name}</h3>
                    <div className="bg-gray-100 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                      ★ {bike.rating}
                      <span className="text-gray-500 ml-1">({bike.reviews})</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-3">{bike.type}</p>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 text-xs text-gray-700">
                    <div className="flex items-center">
                      <span className="font-medium">Engine:</span>&nbsp;{bike.engine}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Power:</span>&nbsp;{bike.horsepower}hp
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Mileage:</span>&nbsp;{bike.mileage}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Gearbox:</span>&nbsp;{bike.gearbox}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className={`text-sm ${bike.available ? "text-green-600" : "text-red-600"} font-medium`}>
                      {bike.available ? "Available Now" : "Unavailable"}
                    </span>
                    <button
                      onClick={() => window.location.href = `/bike-details/${bike._id}`}
                      className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${bike.available
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      disabled={!bike.available}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {currentBikes.map((bike) => (
              <div key={bike.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                <div className="w-1/3 relative">
                  <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
                  {bike.featured && (
                    <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4 w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">{bike.name}</h3>
                      <div className="text-xl font-bold text-black">${bike.pricePerHour}/hr</div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{bike.type}</p>

                    <div className="grid grid-cols-3 gap-3 my-2">
                      <div className="text-sm"><span className="font-medium">Engine:</span> {bike.engine}</div>
                      <div className="text-sm"><span className="font-medium">Power:</span> {bike.horsepower}hp</div>
                      <div className="text-sm"><span className="font-medium">Mileage:</span> {bike.mileage} kmpl</div>
                      <div className="text-sm"><span className="font-medium">Seats:</span> {bike.seats}</div>
                      <div className="text-sm"><span className="font-medium">Gearbox:</span> {bike.gearbox}</div>
                      <div className="text-sm"><span className="font-medium">Brakes:</span> {bike.brakes}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                        ★ {bike.rating}
                        <span className="text-gray-500 ml-1">({bike.reviews})</span>
                      </div>
                      <span className={`ml-3 text-sm ${bike.available ? "text-green-600" : "text-red-600"} font-medium`}>
                        {bike.available ? "Available Now" : "Currently Unavailable"}
                      </span>
                    </div>
                    <button
                      className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                      disabled={!bike.available}
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show current page, first page, last page, and pages around current page
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentPage === page
                          ? "bg-black text-white font-medium"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="text-gray-500">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bikes;