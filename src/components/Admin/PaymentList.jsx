import React, { useState } from "react";
import moment from "moment";

const statusColors = {
  Success: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

const PaymentList = ({ payments, onUpdateStatus }) => {
  const [search, setSearch] = useState("");

  const filtered = payments.filter((p) =>
    (p._id + p.description).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Payment ID or Description"
          className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">No matching payments.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">₹{payment.amount}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[payment.status]}`}
                >
                  {payment.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                🧾 <span className="font-medium">{payment.description}</span>
              </p>
              <p className="text-sm text-gray-600">
                💳 Method:{" "}
                <span className="font-medium">{payment.method}</span>
              </p>
              <p className="text-sm text-gray-600">
                📅 Date:{" "}
                <span className="font-medium">
                  {moment(payment.date).format("LLL")}
                </span>
              </p>

              {/* Status Dropdown */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Update Status:
                </label>
                <select
                  value={payment.status}
                  onChange={(e) =>
                    onUpdateStatus(payment._id, e.target.value)
                  }
                  className="w-full border rounded-lg px-2 py-1 text-sm"
                >
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <p className="text-xs text-gray-400 mt-4 break-words">
                Payment ID: <span className="font-mono">{payment._id}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentList;
