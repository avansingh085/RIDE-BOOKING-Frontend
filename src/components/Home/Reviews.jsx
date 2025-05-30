import React, { useEffect, useState } from 'react';
import apiClient from '../../../utils/apiClient';
import { useSelector } from 'react-redux';

const CustomerTestimonials = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await apiClient('/review/random/3');
        setReview(response.data);
      } catch (error) {
        console.log(error, "error during review fetch");
      }
    };
    fetchReview();
  }, []);

  return (
    <div className="relative w-full  ">
      <ReviewForm />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          What Our Customer Saying...
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {review?.map((testimonial) => (
            <div
              key={testimonial._id}
              className="relative rounded-lg overflow-hidden h-96 group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${testimonial.image})`,
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{testimonial.title}</h3>
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

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
  });
  const { profile } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [sendingReview, setSendingReview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendingReview(true);
    const payload = {
      name: profile.name,
      title: formData.title,
      text: formData.text,
      image: formData.image,
    };

    try {
      await apiClient.post('/review', payload);
      setIsOpen(false);
      setFormData({ title: '', text: '', image: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSendingReview(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="text-center text-4xl sm:text-5xl h-14 w-14 sm:h-16 sm:w-16 bg-orange-400 hover:cursor-pointer text-white hover:bg-orange-500 rounded-full shadow-lg flex items-center justify-center"
        >
          +
        </div>
      )}

      {/* Modal */}
      {isOpen && profile && (
        <div className="relative w-[90vw] max-w-md bg-white text-black rounded-lg p-6 shadow-2xl">
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-black text-xl font-bold hover:text-red-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Submit a Review</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border border-gray-300"
              required
            />

            <textarea
              name="text"
              placeholder="Your review..."
              value={formData.text}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border border-gray-300 resize-none h-24"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border border-gray-300"
            />

            <button
              type="submit"
              disabled={sendingReview}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              {sendingReview ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
