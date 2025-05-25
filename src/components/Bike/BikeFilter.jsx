import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/bike/bikeSlice";

const FilterBar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceSort, setPriceSort] = useState("");
  const [duration, setDuration] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filtersRef = useRef(null);
  const dispatch=useDispatch();
   const {bikes}=useSelector((state)=>state.bike);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  //filter bike 
   useEffect(() => {
    if(!bikes)
      return;
  let updatedBikes = [...bikes];

  // if (duration?.length) {
  //   updatedBikes = updatedBikes.filter(bk => duration.includes(bk.duration));
  // }
  if (brands?.length) {
    updatedBikes = updatedBikes.filter(bk => brands.includes((bk.brand).toLowerCase()));
  }

  if (searchQuery) {
    updatedBikes = updatedBikes.filter(bk =>
      Object.values(bk).some(val =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  if (priceSort === "low-to-high") {
    updatedBikes.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (priceSort === "high-to-low") {
    updatedBikes.sort((a, b) => b.pricePerHour - a.pricePerHour);
  }
  
    dispatch(setFilters(updatedBikes))
  // setFilteredBikes(updatedBikes);
}, [bikes, duration, brands, searchQuery, priceSort]);


  const handleDurationChange = (value) => {
    if (duration.includes(value)) {
      setDuration(duration.filter(item => item !== value));
    } else {
      setDuration([...duration, value]);
    }
  };

  const handleBrandChange = (value) => {
    if (brands.includes(value)) {
      setBrands(brands.filter(item => item !== value));
    } else {
      setBrands([...brands, value]);
    }
  };

  const resetFilters = () => {
    setPriceSort("");
    setDuration([]);
    setBrands([]);
    setSearchQuery("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (priceSort) count++;
    count += duration.length;
    count += brands.length;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="w-full bg-gray-50 rounded-lg p-5 border border-gray-200">
      {/* Search and filter toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            placeholder="Search for vehicles..."
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-5 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors relative"
        >
          <SlidersHorizontal size={18} className="mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown 
            size={18} 
            className={`ml-2 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Active filters display */}
      {(duration.length > 0 || brands.length > 0 || priceSort) && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 mr-1">Active filters:</span>
          {priceSort && (
            <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center">
              Price: {priceSort === "low-to-high" ? "Low to High" : "High to Low"}
              <button onClick={() => setPriceSort("")} className="ml-2 text-gray-600 hover:text-black">
                <X size={14} />
              </button>
            </span>
          )}
          {duration.map(d => (
            <span key={d} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center">
              {d.charAt(0).toUpperCase() + d.slice(1)}
              <button onClick={() => handleDurationChange(d)} className="ml-2 text-gray-600 hover:text-black">
                <X size={14} />
              </button>
            </span>
          ))}
          {brands.map(b => (
            <span key={b} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm flex items-center">
              {b.charAt(0).toUpperCase() + b.slice(1)}
              <button onClick={() => handleBrandChange(b)} className="ml-2 text-gray-600 hover:text-black">
                <X size={14} />
              </button>
            </span>
          ))}
          {activeFiltersCount > 0 && (
            <button 
              onClick={resetFilters}
              className="text-sm text-black hover:underline ml-2"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Expanded filter section */}
      {showFilters && (
        <div ref={filtersRef} className="mt-4 bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Price filter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Price</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={priceSort === "low-to-high"}
                    onChange={() => setPriceSort("low-to-high")}
                    className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Low to High</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={priceSort === "high-to-low"}
                    onChange={() => setPriceSort("high-to-low")}
                    className="form-radio h-4 w-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">High to Low</span>
                </label>
              </div>
            </div>

            {/* Time Duration filter */}
            {/* <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Time Duration</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={duration.includes("hourly")}
                    onChange={() => handleDurationChange("hourly")}
                    className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black rounded"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Hourly</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={duration.includes("daily")}
                    onChange={() => handleDurationChange("daily")}
                    className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black rounded"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Daily</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={duration.includes("weekly")}
                    onChange={() => handleDurationChange("weekly")}
                    className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black rounded"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Weekly</span>
                </label>
              </div>
            </div> */}

            {/* Brand filter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Brand</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={brands.includes("honda")}
                    onChange={() => handleBrandChange("honda")}
                    className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black rounded"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Honda</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={brands.includes("yamaha")}
                    onChange={() => handleBrandChange("yamaha")}
                    className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black rounded"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Yamaha</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={brands.includes("suzuki")}
                    onChange={() => handleBrandChange("suzuki")}
                    className="form-checkbox h-4 w-4 text-black border-gray-300 focus:ring-black rounded"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-black transition-colors">Suzuki</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={resetFilters}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;