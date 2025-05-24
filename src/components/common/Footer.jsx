import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
  } from "react-icons/fa";
  const Footer = () => {
    return (
      <footer className="bg-black text-white px-20 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-xl font-bold mb-2">Drivee</h2>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Is just a Drivee ride away. Take control of your journey today.
            </p>
            <div className="flex space-x-4 mt-2">
              <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-gray-300" />
            </div>
          </div>
  
          {/* About Company */}
          <div>
            <h3 className="font-semibold mb-3">About Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Help</li>
              <li>Contact Us</li>
              <li>Fee Policy</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>
  
          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-3">City</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Dhaka</li>
              <li>Chittagong</li>
              <li>Sylhet</li>
              <li>Khulna</li>
              <li>Borishal</li>
              <li>Rajshahi</li>
              <li>Rongpur</li>
            </ul>
          </div>
  
          {/* Vehicle Types */}
          <div>
            <h3 className="font-semibold mb-3">Vehicle Types</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Car</li>
              <li>Bike</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  