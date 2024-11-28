import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ROBase from "./ROBase";

const ROHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const storedData = JSON.parse(
    localStorage.getItem("user") || '{"user":{"uid":""}}'
  );
  const oid = storedData.user.uid;
  const organizationId = 1;
  console.log("Stored data:", storedData);
  console.log("Organizer ID (oid):", oid);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:1987/api/recipient/getorganizer?uid=${storedData.user.uid}`
        );
        const organizerId = response1.data;
        const response = await axios.get(
          `http://localhost:1987/api/recipient/request-history?organizationId=${organizerId}${
            filter !== "ALL" ? `&status=${filter}` : ""
          }`
        );

        setRequests(response.data);
        console.log("API Response:", response.data);
      } catch (error) {
        setError("Failed to fetch request history");
        console.error("Error fetching request history:", error);
        setError("Failed to fetch request history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [filter]);

  if (loading) {
    return (
      <ROBase>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </ROBase>
    );
  }

  return (
    <ROBase>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Request History</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="ALL">All Requests</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.foodOffer.foodType}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {request.foodOffer.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : request.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "CONFIRMED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <span className="ml-2 text-gray-900">
                      {request.foodOffer.quantity}kg
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Request Date:</span>
                    <span className="ml-2 text-gray-900">
                      {request.requestDate
                        ? new Date(
                            Date.parse(request.requestDate)
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ROBase>
  );
};

export default ROHistory;
