import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/user/userSlice";
import { fetchBikes } from "../../redux/bike/bikeSlice";
const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isAdmin,setIsAdmin]=useState(false);
  // const authUser = useSelector((state) => state.auth.user);
  const { profile, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  // Simulate checking authentication status
  // useEffect(() => {
  //   // Replace this with your actual auth check logic
  //   dispatch(fetchBikes());
  //   dispatch(fetchUser());
  // }, [authUser]);
  useEffect(() => {

    if (profile) {
      setIsAuthenticated(true);
      if(profile?.isAdmin)
      {
        setIsAdmin(true);
      }
      else
      {
        setIsAdmin(false);
      }
    }
    if (error) {
      setIsAuthenticated(false);
      console.log(error);
    }

  }, [profile, error])

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleSignOut = () => {
    // Replace with your actual sign out logic
    localStorage.removeItem("BikeToken");
    setIsAuthenticated(false);
    setShowProfileDropdown(false);
  };

  return (
    <nav className="bg-black text-white px-4 md:px-20 py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div onClick={() => window.location.href = "/"} className="text-2xl font-bold transition-transform duration-300 hover:scale-105 hover:cursor-pointer">Drivee</div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/bikes"
            className="relative block px-4 py-2 hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Bikes
          </Link>
          <Link
            to="/contact"
            className="relative block px-4 py-2 hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="relative block px-4 py-2 hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            About us
          </Link>
          <Link
            to="/privacy"
            className="relative block px-4 py-2 hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Privacy Policy
          </Link>
         { isAdmin&&<Link
            to="/admin"
            className="relative block px-4 py-2 hover:text-gray-300 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Admin
          </Link>}
        </div>

        {/* Authentication Section */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-white hover:border-gray-300 transition-all duration-300">
                  <User size={20} />
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg py-1 z-50 transform origin-top-right transition-all duration-200 ease-in-out">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-150">My Profile</Link>
                  {/* <Link to="/bookings" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-150">My Bookings</Link> */}
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-150">Settings</Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden mt-4 bg-gray-900 rounded-md p-4 transition-all duration-300 ease-in-out">
          <Link
            to="/"
            className="block py-2 hover:text-gray-300 transition-colors duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            Home
          </Link>
           <Link
            to="/bikes"
            className="block py-2 hover:text-gray-300 transition-colors duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            Bikes
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:text-gray-300 transition-colors duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/privacy"
            className="block py-2 hover:text-gray-300 transition-colors duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            Refund Policy
          </Link>
        { isAdmin&&<Link
            to="/admin"
            className="block py-2 hover:text-gray-300 transition-colors duration-200"
            onClick={() => setShowMobileMenu(false)}
          >
            Admin
          </Link>}

          <div className="mt-4 pt-4 border-t border-gray-700">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Profile
                </Link>
                {/* <Link
                  to="/bookings"
                  className="block py-2 hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Bookings
                </Link> */}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="border border-white text-center text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-center text-black px-4 py-2 rounded hover:bg-gray-200 transition-all duration-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;