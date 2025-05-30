import { useEffect, useState } from 'react';
import logincover from '../../../assets/login_cover.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../../../../utils/apiClient';
// import { GoogleLogin } from '@react-oauth/google';
const Login = () => {
  const [formState, setFormState] = useState('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAgree: false,
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  useEffect(() => {
    let timer;
    if (formState === 'verifyOtp' && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [formState, resendTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  

  const toggleMode = () => {
    setFormState((prev) => (prev === 'login' ? 'signup' : 'login'));
    setFormData({ name: '', email: '', password: '', isAgree: false });
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !formData.email) return;
    setSendingOtp(true);
    try {
      const response = await apiClient.post('/auth/send-otp', { email: formData.email });
      if (response.status === 200) {
        setResendTimer(60);
        setOtpError(response.data.message || 'OTP resent successfully');
      }
    } catch (err) {
      setOtpError(err?.response?.data?.error || 'Failed to resend OTP');
    }
    setSendingOtp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');

    if (formState === 'login') {
      dispatch(login(formData));
      return;
    }

    if (formState === 'signup') {
      if (!formData.email) {
        setOtpError('Email is required to send OTP');
        return;
      }
      setSendingOtp(true);
      try {

        const response = await apiClient.post('/auth/send-otp', { email: formData.email });
        if (response.status === 200) {
          setFormState('verifyOtp');
          setResendTimer(60);
        } else {
          setOtpError(response.data.message || 'Failed to send OTP');
        }
      } catch (err) {
        console.log(err);
        setOtpError(err?.response?.data?.error || err?.response?.data?.message || 'Failed to send OTP');
      }
      setSendingOtp(false);
      return;
    }

    if (formState === 'verifyOtp') {
      setIsOtpVerifying(true);
      try {
        const response = await apiClient.post('/auth/verify-otp', {
          email: formData.email,
          otp: otp.join(''),
        });

        if (response.status === 200) {
          dispatch(register(formData));
          setOtpError(<span className='bg-green-400'>{response?.data?.message || 'OTP verified successfully'} redirect home page </span>);
        } else {
          setOtpError(response?.data?.message || 'OTP verification failed');
        }
      } catch (err) {
        setOtpError(err?.response?.data?.error || 'OTP verification failed');
      }
      setIsOtpVerifying(false);
    }
  };

  return (
    <div className="flex h-screen flex-col sm:flex-row">
      <div className="relative w-full sm:w-1/2 bg-black text-white overflow-hidden flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={logincover}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center px-4 max-w-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome to Drivee®</h1>
          <p className="text-lg mb-2">The best global bike sharing marketplace</p>
          <p className="text-sm mb-6">Have a bike? Earn money as a Host. Rent your dream ride as a Guest.</p>
        </div>
      </div>

      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold">
          &times;
        </Link>

        <div className="flex flex-col space-y-5 w-full max-w-md">
          <h1 className="text-4xl font-bold">Drivee</h1>
          <div>
            <p className="text-xl font-semibold">
              {formState === 'login'
                ? 'Welcome Back!'
                : formState === 'signup'
                  ? 'Create An Account.'
                  : 'OTP Verification'}
            </p>
            <p className="text-gray-500">
              {formState === 'login'
                ? 'Login to explore amazing rides.'
                : formState === 'signup'
                  ? 'Join over 500+ happy customers.'
                  : 'Enter the OTP sent to your email.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {formState !== 'verifyOtp' && (
              <>
                {formState === 'signup' && (
                  <div>
                    <label className="text-sm font-bold block mb-1">Name<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={handleChange}
                      className="w-full border rounded py-2 px-3"
                      placeholder="Enter your name"
                    />
                  </div>
                )}
                <div>
                  <label className="text-sm font-bold block mb-1">Email<span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1">Password<span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3"
                    placeholder="Enter your password"
                  />
                </div>
                {
                  <span className='text-red-500'>{otpError}</span>
                }
                {formState === 'signup' && (
                  <div>
                    <label className="inline-flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        name="isAgree"
                        required
                        onChange={handleChange}
                        className="mr-2"
                      />
                      I agree to the{' '}
                      <a href="#" className="text-black underline">
                        Terms and Privacy Policy
                      </a>
                    </label>
                  </div>
                )}
              </>
            )}

            {formState === 'verifyOtp' && (
              <div>
                <label className="text-sm font-bold block mb-2">Enter OTP</label>
                <div className="flex justify-between space-x-2 mb-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, idx)}
                      className="w-10 h-10 text-center border rounded"
                    />
                  ))}
                </div>
                {otpError && <div className="text-sm text-red-600">{otpError}</div>}
                <div className="text-sm text-right">
                  {resendTimer > 0 ? (
                    <span>Resend OTP in {resendTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleResend} className="text-black underline">
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isOtpVerifying || sendingOtp}
              className={`bg-black text-white py-2 px-4 rounded w-full font-bold hover:bg-gray-800 ${loading || sendingOtp || isOtpVerifying ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {formState === 'login'
                ? 'Login'
                : formState === 'signup'
                  ? 'Sign Up'
                  : isOtpVerifying
                    ? 'Verifying...'
                    : 'Verify OTP'}
            </button>

            {formState !== 'verifyOtp' && (
              <p className="text-center text-sm text-gray-600">
                {formState === 'login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-black underline"
                >
                  {formState === 'login' ? 'Sign up here.' : 'Login here.'}
                </button>
              </p>
            )}
          </form>
        </div>
        {/* <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => alert('Login Failed')}
  useOneTap
/> */}
      </div>
    </div>
  );
};

export default Login;
