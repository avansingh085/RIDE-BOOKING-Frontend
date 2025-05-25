import React, { useState } from 'react';
import apiClient from '../../../utils/apiClient';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [messageIsSending,setMessageIsSending]=useState(false);
  const [error,setError]=useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setError('');
    setMessageIsSending(true)
    try{
        await apiClient.post('/contact',formData)
        setFormData({
    name: '',
    email: '',
    message: '',
  });
    }
    catch(err)
    {
           setError('error during message send ')
    }finally{
        setMessageIsSending(false);
    }
   
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="5"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={messageIsSending}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
            {
                messageIsSending ? 'Send...' :'Send Message'
            }
          <div className='text-red-600'>  {
                error
            }</div>
            
          
        </button>
      </form>
    </div>
  );
};

export default Contact;
