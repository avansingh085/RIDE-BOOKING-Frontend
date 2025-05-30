import React, { useEffect, useState } from 'react';
import apiClient from '../../../utils/apiClient';
import { useSelector } from 'react-redux';
const CustomerTestimonials = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await apiClient('/review/random/3');
        setReview(response.data);
      } catch (error) {
        console.log(error, 'error during review fetch');
      }
    };
    fetchReview();
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <ReviewForm />
    
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
        What Our Customers Say
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Hear from our satisfied customers about their experience with us
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {review?.map((testimonial) => (
        <div
          key={testimonial._id}
          className="relative rounded-2xl bg-white shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10" />
          
          {/* Content */}
          <div className="relative flex flex-col justify-between p-8 h-96">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.27 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{testimonial.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">{testimonial.text}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "https://via.placeholder.com/48"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role || "Customer"}</p>
                </div>
              </div>
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
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file selection and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      // Prepare form data for upload
      const data = new FormData();
      data.append('image', file);

      const response = await apiClient.post('/upload/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData((prev) => ({ ...prev, image: response.data.imageUrl }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
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
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="text-center text-4xl sm:text-5xl h-14 w-14 sm:h-16 sm:w-16 bg-orange-400 hover:cursor-pointer text-white hover:bg-orange-500 rounded-full shadow-lg flex items-center justify-center"
        >
          +
        </div>
      )}

      {isOpen && profile && (
        <div className="relative w-[90vw] max-w-md bg-white text-black rounded-lg p-6 shadow-2xl">
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

            {/* Image Upload */}
            <label className="block">
              <span className="text-gray-700">Upload Image (optional)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-orange-50 file:text-orange-700
                  hover:file:bg-orange-100"
              />
              {uploadingImage && <p className="text-sm text-gray-600 mt-1">Uploading...</p>}
              {formData.image && !uploadingImage && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-24 object-contain rounded-md border"
                />
              )}
            </label>

            <button
              type="submit"
              disabled={sendingReview || uploadingImage}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {sendingReview ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

