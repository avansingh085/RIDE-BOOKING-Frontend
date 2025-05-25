import React, { useState } from "react";

export default function Settings() {
  const [bikePref, setBikePref] = useState("Mountain");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Bike Preference</label>
          <select
            value={bikePref}
            onChange={(e) => setBikePref(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded"
          >
            <option>Mountain</option>
            <option>Road</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">Enable Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-4 w-4 text-blue-600"
          />
        </div>

        <div className="text-right mt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
