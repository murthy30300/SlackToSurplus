import React, { useState, useEffect } from "react";
import axios from "axios";
import DonationCard from "./DonationCard";
import { Loader2 } from "lucide-react";
import CONFIG from "../config";
function MyDonations() {
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedData = JSON.parse(
    localStorage.getItem("user") || '{"user":{"uid":""}}'
  );
  const API_BASE_URL = `${CONFIG.API_BASE_URL}`;

  useEffect(() => {
    const fetchMyDonations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/foodOffers/mydonations?userId=${storedData.user.uid}`
        );
        console.log(response.data)
        setMyDonations(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch my donations");
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [storedData.user.uid]);

  const handleComplete = async (donation) => {
    try {
      await axios.post(`${API_BASE_URL}/requests/${donation.foid}/complete`);
      alert("Donation marked as completed!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to complete donation");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (myDonations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No donations found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {myDonations.map((donation, index) => (
        <DonationCard
          key={`${donation.id}-${index}`}
          donation={donation}
          actionLabel="Mark as Completed"
          onAction={handleComplete}
          showAction={donation.status === "PENDING"}
        />
      ))}
    </div>
  );
}

export default MyDonations;
