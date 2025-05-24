import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/user/userSlice";

const ProfileOverview = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const {profile}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    preferredBikeType: "",
    receiveEmails: false
  });

  useEffect(() => {
    // Simulate fetching user data
    if(!profile)
      return;
    const fetchedUser = profile||{
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      joinedDate: "2024-01-20",
      location: "San Francisco, CA",
      preferences: {
        receiveEmails: true,
        preferredBikeType: "Electric Scooter",
      },
    };
    setUser(fetchedUser);
    setFormData({
      name: fetchedUser.name,
      email: fetchedUser.email,
      phone: fetchedUser.phone,
      location: fetchedUser.location,
      preferredBikeType: fetchedUser.preferences.preferredBikeType,
      receiveEmails: fetchedUser.preferences.receiveEmails
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData))
    // Here you would typically send the data to your API
    console.log("Updated user data:", formData);
   
    // Update local user state to reflect changes
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      preferences: {
        preferredBikeType: formData.preferredBikeType,
        receiveEmails: formData.receiveEmails
      }
    });
    
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Reset form data if canceling
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        preferredBikeType: user.preferences.preferredBikeType,
        receiveEmails: user.preferences.receiveEmails
      });
    }
    setIsEditing(!isEditing);
  };

  if (!user) return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const bikeOptions = [
    "Electric Scooter", 
    "Mountain Bike", 
    "Road Bike", 
    "Hybrid Bike", 
    "BMX"
  ];

  return (
    <div className="bg-white p-6 rounded-xl space-y-8 max-w-4xl mx-auto transition-all">
      <form onSubmit={handleSubmit}>
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between border-b pb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
            <div className="relative group">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow"
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">Change</span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Member since {formatDate(user.joinedDate)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={toggleEdit} 
              className={`text-sm px-4 py-2 rounded-md transition-colors ${
                isEditing 
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800" 
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            {isEditing && (
              <button 
                type="submit" 
                className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Preferred Bike Type</label>
              {isEditing ? (
                <select
                  name="preferredBikeType"
                  value={formData.preferredBikeType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {bikeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.preferredBikeType}
                  disabled
                  className="w-full px-4 py-2 text-gray-700 bg-gray-50 border rounded-lg"
                />
              )}
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-4 mt-2 sm:mt-6">
              <span className="text-sm font-medium text-gray-700">Receive Email Updates</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="receiveEmails"
                  checked={formData.receiveEmails}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className={`w-12 h-6 rounded-full peer transition-all ${
                  formData.receiveEmails 
                    ? "bg-blue-600" 
                    : "bg-gray-300"
                } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  formData.receiveEmails 
                    ? "after:translate-x-6" 
                    : ""
                } ${!isEditing ? "opacity-80" : ""}`} />
                <span className={`ml-3 text-sm ${formData.receiveEmails ? "text-gray-800" : "text-gray-600"}`}>
                  {formData.receiveEmails ? "Yes" : "No"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileOverview;