import React, { useEffect, useState } from "react";
import { Calendar, CreditCard, CheckCircle, XCircle, Download } from "lucide-react";
import { useSelector } from "react-redux";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const {profile}=useSelector((state)=>state.user)
  useEffect(() => {
    // Simulate API call with loading state
    if(!profile)
      return;
    setIsLoading(true);
    setTimeout(() => {
      setPayments(profile.payments);
      setIsLoading(false);
    }, 800);
  }, []);

  const getPaymentIcon = (method) => {
    switch (method) {
      case "Card":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status) => {
    return status === "Success" ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <XCircle className="w-4 h-4 text-red-500" />;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === "all") return true;
    return payment.status.toLowerCase() === filter.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse flex justify-between p-4 border-b">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center py-12">
        <div className="inline-flex justify-center items-center w-12 h-12 bg-gray-100 rounded-full mb-4">
          <Calendar className="w-6 h-6 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No payment history</h3>
        <p className="text-sm text-gray-500">You haven't made any payments yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
          <button className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md flex items-center gap-1 transition-colors">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr 
                key={payment.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(payment.date)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {payment.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center gap-1.5">
                    {getPaymentIcon(payment.method)}
                    {payment.method}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                  ₹{payment.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === "Success" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {getStatusIcon(payment.status)}
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <div>Showing {filteredPayments.length} payments</div>
        <div className="flex items-center">
          <span className="mr-2">Need help?</span>
          <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;