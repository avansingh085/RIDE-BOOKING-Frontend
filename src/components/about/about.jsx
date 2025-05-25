import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md my-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>

      <p className="mb-4">
        Welcome to our application! We are passionate about building user-friendly, efficient, and scalable digital solutions to solve real-world problems.
      </p>

      <p className="mb-4">
        This platform was created to help users seamlessly connect, collaborate, and explore technology. Whether you're booking bikes, chatting with friends, or exploring games, we strive to deliver the best experience possible.
      </p>

      <p className="mb-4">
        Our mission is to empower users with reliable and secure services, supported by modern web technologies like React, Node.js, MongoDB, and more.
      </p>

      <p className="mb-4">
        We continuously improve our product based on user feedback and aim to keep everything simple, fast, and intuitive.
      </p>

      <p>
        Thank you for using our app. If you have questions or suggestions, feel free to reach out to us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>.
      </p>
    </div>
  );
};

export default About;
