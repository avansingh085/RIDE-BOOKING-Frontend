import React, { useState } from "react";
import ProfileOverview from "../../components/profile/ProfileOverview";
import PaymentsList from "../../components/profile/PaymentsList";
import SidebarTabs from "../../components/profile/SidebarTabs";
import BookingsList from "../../components/profile/BookingsList";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileOverview />;
      case "bookings":
        return <BookingsList />;
      case "payments":
        return <PaymentsList />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content Area */}
          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
