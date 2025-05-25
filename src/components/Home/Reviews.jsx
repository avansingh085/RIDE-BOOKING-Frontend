import React, { useEffect, useState } from 'react';
import apiClient from '../../../utils/apiClient';
import { useSelector } from 'react-redux';

const CustomerTestimonials = () => {

  const [review, setReview] = useState([]);

  //fetch review of customer
  useEffect(() => {
    const fetchReview = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        let responce = await apiClient('/review/random/3');
        setReview(responce.data);
      }
      catch (error) {
        console.log(error, "error during review fetch")
      }
    }

    fetchReview();

  }, [])

  return (
    <div className="py-16">
      <ReviewForm/>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Customer Saying...</h2>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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


const ReviewForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: '',
  });
 const {profile}=useSelector((state)=>state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [sendingReview,setSendingReview]=useState(false);
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
      name:profile.name,
      title: formData.title,
      text: formData.text,
      image: formData.image,
    };

    try {
     await apiClient.post('/review',payload);
      setIsOpen(false); // close on success
      setFormData({ title: '', text: '', image: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
    }finally{
      setSendingReview(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Floating Plus Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="text-center text-5xl absolute rounded-full h-16 w-16 bg-orange-400 hover:cursor-pointer text-white hover:bg-orange-500 right-14 bottom-8 shadow-xl flex items-center justify-center"
        >
          +
        </div>
      )}

      {/* Review Form */}
      {isOpen&&profile && (
        <div className="absolute h-auto w-96 right-8 bottom-24 bg-white p-6 rounded-lg shadow-2xl text-black">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-black text-xl font-bold hover:text-red-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <h2 className="text-xl font-semibold">Submit a Review</h2>

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
              className={`bg-black  text-white px-4 py-2 rounded-md hover:bg-gray-800`}
            >
              {
                sendingReview ? 'submiting...' : 'Submit'
              }
              
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
