import React, { useState, useEffect } from "react";
import moment from "moment";
import apiClient from "../../../utils/apiClient";
const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiClient.get("/contact/contact") 
      .then((res) => setMessages(res.data.messages))
      .catch((err) => console.error("Error fetching messages", err));
  }, []);

  const filtered = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 shadow-2xl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Messages</h1>

        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full p-2 border rounded-xl mb-6 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((msg) => (
              <div
                key={msg._id}
                className="bg-white rounded-2xl p-4 shadow-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-blue-600">
                    {msg.name}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {moment(msg.date).format("LLL")}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  📧 <span className="font-medium">{msg.email}</span>
                </p>

                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800 whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
