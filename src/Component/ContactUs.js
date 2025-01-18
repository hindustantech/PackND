import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    toast.success('Thank you for Contacting us!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 py-12 px-6 lg:px-20">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-indigo-500"
        >
          <ChevronLeft className="w-6 h-6 mr-1" />
          
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Your Email"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Subject"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition duration-300 w-full md:w-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
