import React from "react";
import { User, Bike, CreditCard } from "lucide-react";

const SidebarTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "bookings", label: "Bookings", icon: <Bike className="w-4 h-4" /> },
    { id: "payments", label: "Payments", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition ${
            activeTab === tab.id
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SidebarTabs;
