import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = {
  General: [],
  Security: [],
  Booking: [
    "How Do I Find A Car Or Bike For Trip?",
    "How Can I Extend My Trip Date After Booking?",
    "How Do Extend My Trip?",
    "Am I Responsible For Fuel?",
    "Can I Book Car Or Bike Under 20 Of Age?",
    "How Can I Apply For Promo Code?",
  ],
  Payment: [],
  Others: [],
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("Booking");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Have Any Question</h1>

      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(faqData).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeTab === tab
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqData[activeTab].map((question, index) => (
          <div
            key={index}
            className="cursor-pointer border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-sm font-medium">{question}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
