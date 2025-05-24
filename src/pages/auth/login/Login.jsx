import { useEffect, useState } from 'react';
import logincover from '../../../assets/login_cover.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAgree: false,
  });

  useEffect(() => {
    if (user)
      navigate('/');
    if (error)
      console.log(error);
  }, [user, error])
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (isLogin)
      dispatch(login(formData))
    else
      dispatch(register(formData))
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const toggleMode = () => setIsLogin((prev) => !prev);

  return (
    <div className="flex h-screen flex-col sm:flex-row transition-all duration-500 ease-in-out">
      <div className="relative w-full sm:w-1/2 bg-black flex items-center justify-center text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={logincover}
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4 max-w-lg">
          <h1 className="lg:text-3xl sm:text-3xl font-bold mb-4">Welcome to Drivee®</h1>
          <p className="lg:text-lg sm:text-xl mb-2">the best global bikesharing marketplace</p>
          <p className="lg:text-sm sm:text-base mb-6">
            Have a bike? Earn money as a Host. Rent your dream ride as a Guest.
          </p>
        </div>
      </div>

      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 sm:p-12 transition-all duration-500 ease-in-out">
        <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold">
          &times;
        </Link>
        <div className="flex flex-col space-y-5 w-full max-w-md">
          <h1 className="text-4xl font-bold">Drivee</h1>
          <div className="flex flex-col">
            <p className="text-xl font-semibold">
              {isLogin ? 'Welcome Back!' : 'Create An Account.'}
            </p>
            <p className="text-gray-500">
              {isLogin
                ? 'Login to explore amazing rides around the world.'
                : 'We love to have you on board. Join over 500+ customers globally.'}
            </p>
          </div>
          <form className="bg-white rounded pt-6 pb-8 space-y-4 transition-all duration-300" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="transition-opacity duration-300 ease-in-out">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password" required
                onChange={handleChange}
              />
            </div>
            {!isLogin && (
              <div className="transition-opacity duration-300 ease-in-out">
                <label className="inline-flex items-center text-sm text-gray-600">
                  <input type="checkbox" name="isAgree" className="form-checkbox h-4 w-4 text-black mr-2" onChange={handleChange} required />
                  I agree to the{' '}
                  <a href="#" className="text-black underline">
                    Terms and Privacy Policy
                  </a>
                </label>
              </div>
            )}
            <div>
              <button
                className={`bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full ${loading ? 'opacity-40' : 'opacity-100'}`}
                type="submit"
              >
                {isLogin ? 'Login' : 'Sign up'}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-black underline focus:outline-none"
              >
                {isLogin ? 'Sign up here.' : 'Login here.'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
