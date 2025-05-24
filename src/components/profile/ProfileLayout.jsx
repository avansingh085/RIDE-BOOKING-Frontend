import React, { useState } from "react";
import SidebarTabs from "./SidebarTabs";
import ProfileOverview from "./ProfileOverview";
import BookingsList from "./BookingsList";
import PaymentsList from "./PaymentsList";

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return <BookingsList />;
      case "payments":
        return <PaymentsList />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex p-4 gap-6">
      <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default ProfileLayout;
