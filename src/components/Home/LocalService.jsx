import React, { useState } from 'react';

const LocalServiceCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const locations = [
    { id: 1, name: "Gazipur", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2015/12/bike-riding-in-india.jpg" },
    { id: 2, name: "Mohammud Pur", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2016/12/Mountain-Bikking-Adventure-in-Sikkim.jpg" },
    { id: 3, name: "Gulshan", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2015/02/Leh-Sri-Nagar-Motor-Bike-Safari.jpg" },
    { id: 4, name: "Dhanmondi", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2018/06/Exotic-Kerala-Holiday-Package.jpg" },
    { id: 5, name: "Mohakali", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2015/12/Spiti-Valley-biking.jpg" },
    { id: 6, name: "Banani", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2015/12/arunachal-biking.jpg" },
    { id: 7, name: "Uttara", image: "https://www.tourmyindia.com/blog//wp-content/uploads/2016/12/Mountain-Bikking-Adventure-in-Sikkim.jpg" }
  ];

  const showLocations = () => {
    // For mobile, show 1 location, for small screens show 3, for medium and up show 5
    const locationsToShow = window.innerWidth < 640 ? 1 : 
                            window.innerWidth < 768 ? 3 : 5;
    
    // Get a subset of locations based on activeIndex
    const visibleLocations = [];
    for (let i = 0; i < locationsToShow; i++) {
      const index = (activeIndex + i) % locations.length;
      visibleLocations.push(locations[index]);
    }
    
    return visibleLocations;
  };
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };

  return (
    <div 
      className="py-16 bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: `url(/api/placeholder/1600/800)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gray-100 bg-opacity-80"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center mb-16">Local Service We Provide</h2>
        
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
            aria-label="Previous locations"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Location Cards */}
          <div className="flex justify-center space-x-4 md:space-x-8">
            {locations.slice(activeIndex, activeIndex + 5).map((location) => (
              <div key={location.id} className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden w-28 h-28 md:w-32 md:h-32 bg-white p-1 shadow-md">
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 font-medium text-center">{location.name}</p>
              </div>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
            aria-label="Next locations"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalServiceCarousel;