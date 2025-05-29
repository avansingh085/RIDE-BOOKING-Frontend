import React, { useEffect, useState } from "react";
import PaymentList from "./PaymentList"; // Adjust path if needed
import apiClient from "../../../utils/apiClient";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    apiClient.get("/payments")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Failed to load payments", err));
  }, []);

  const updatePaymentStatus = async (id, newStatus) => {
    try {
      const res = await apiClient.put(`/payments/${id}/status`, {
      status:newStatus
      });
  
      if (res.status===200) {
        setPayments((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, status: newStatus } : p
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 shadow-2xl">
      <h1 className="text-2xl font-bold mb-6">All Payments</h1>
      <PaymentList payments={payments} onUpdateStatus={updatePaymentStatus} />
    </div>
  );
};

export default PaymentPage;
