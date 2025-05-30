import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = {
  General: [
    {
      question: "What is the purpose of this platform?",
      answer: "Our platform connects travelers with vehicle owners to rent cars and bikes for trips, offering a seamless and affordable way to explore new destinations."
    },
    {
      question: "How do I create an account?",
      answer: "Click 'Sign Up' on the homepage, enter your email, password, and basic details, then verify your email to start booking."
    },
    {
      question: "Is the platform available in multiple languages?",
      answer: "Yes, we support English, Spanish, French, and Hindi. Change the language in the settings menu."
    }
  ],
  Security: [
    {
      question: "How is my personal information protected?",
      answer: "We use industry-standard encryption and secure servers to protect your data. Your information is never shared without consent."
    },
    {
      question: "What if I suspect unauthorized access?",
      answer: "Change your password immediately and contact support@travelplatform.com for assistance."
    },
    {
      question: "Are vehicle owners verified?",
      answer: "All owners undergo ID verification and vehicle documentation checks to ensure safety and reliability."
    }
  ],
  Booking: [
    {
      question: "How do I find a car or bike for my trip?",
      answer: "Use the homepage search bar, input your location, dates, and vehicle type, then browse and book available options."
    },
    {
      question: "How can I extend my trip date after booking?",
      answer: "In 'My Bookings,' select your trip and request an extension. The owner will confirm availability."
    },
    {
      question: "Am I responsible for fuel?",
      answer: "Yes, renters cover fuel costs during the rental period, unless specified otherwise."
    },
    {
      question: "Can I book if I'm under 20?",
      answer: "You must be 21 with a valid driver's license to book, per our terms."
    },
    {
      question: "How do I apply a promo code?",
      answer: "Enter the promo code at checkout in the payment section. The discount applies if valid."
    }
  ],
  Payment: [
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, and select digital wallets. See all options at checkout."
    },
    {
      question: "What is the refund policy for cancellations?",
      answer: "Cancellations 48 hours before the trip start are eligible for a full refund, minus a small processing fee."
    },
    {
      question: "Are there hidden fees?",
      answer: "No, all fees are transparently listed during booking before you confirm payment."
    }
  ],
  Others: [
    {
      question: "Can I rent a vehicle for someone else?",
      answer: "Yes, but the listed primary driver must meet eligibility criteria and be present at pickup."
    },
    {
      question: "What if the vehicle breaks down?",
      answer: "Contact our 24/7 support team for immediate assistance or a replacement vehicle."
    },
    {
      question: "Are pets allowed in vehicles?",
      answer: "Pet policies depend on the owner. Check the vehicle listing or ask before booking."
    }
  ]
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("Booking");
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    
    window.lucide?.createIcons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
          Frequently Asked Questions
        </h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {Object.keys(faqData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              aria-label={`Select ${tab} category`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
                aria-expanded={openQuestions[index] || false}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-sm sm:text-base font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                <span className="flex-shrink-0">
                  {openQuestions[index] ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openQuestions[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
          {faqData[activeTab].length === 0 && (
            <p className="text-center text-gray-500 text-sm sm:text-base py-8">
              No questions available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;