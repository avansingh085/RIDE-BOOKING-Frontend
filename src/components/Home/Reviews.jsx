import React from 'react';

const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rovert Harvest",
      text: "We Have Been Using Rentaly For Our Trips Needs For Over 10 Years Now And Have Always Been Happy With Their Service. Their Customer Support Is Excellent Service! And They Are Always Available To Help With Any Issues We Have. Their Prices Are Also Very Competitive.",
      title: "Excellent Service! Car Rent Service",
      image: "/api/placeholder/400/500"
    },
    {
      id: 2,
      name: "Jovan Reels",
      text: "I Have Been Using Rentaly For My Car Rental Needs For Over 5 Years Now. I Have Never Had Any Problems With Their Service. Their Customer Support Is Always Responsive And Helpful. I Would Recommend Rentaly To Anyone Looking For A Reliable Car Rental Provider.",
      title: "Excellent Service! Car Rent Service",
      image: "/api/placeholder/400/500"
    },
    {
      id: 3,
      name: "Kanesha Keyton",
      text: "Endorsed By Industry Experts, Rentaly Is The Car Rental Solution You Can Trust. With Years Of Experience In The Field, We Provide Fast, Reliable And Secure Car Rental Services.",
      title: "Excellent Service! Car Rent Service",
      image: "/api/placeholder/400/500"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Customer Saying...</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="relative rounded-lg overflow-hidden h-96 group"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${testimonial.image})`,
                }}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{testimonial.title}</h3>
                <p className="text-sm mb-4 line-clamp-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="h-px bg-white flex-grow mr-3 opacity-50" />
                  <p className="font-medium">{testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;