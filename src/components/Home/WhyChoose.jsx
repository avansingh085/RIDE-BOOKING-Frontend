import React from 'react';

const WhyChooseUs = () => {
  const stats = [
    { value: '45k+', label: 'Successful', id: 'successful' },
    { value: '1M+', label: 'Happy Customer', id: 'customers' },
    { value: '3+', label: 'Year Experience', id: 'experience' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side - Text content */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-gray-600">
            Booking a self-driving car with us is simple and easy. You can browse our 
            selection of vehicles online, choose the car that best fits your needs, and 
            book it for the duration of your choice.
          </p>
        </div>

        {/* Right side - Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm md:text-base text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;