import React, { useState, useEffect } from "react";
import axios from "axios";
import ROBase from "./ROBase";
import { useNavigate } from "react-router-dom";

const ROProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("user"));
  console.log("*************");
  console.log(storedData.user.uid);

  useEffect(() => {
    const storedUserId = storedData.user.uid;
    console.log(storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("User ID not found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found, please log in again.");
      return;
    }

    const data = {
      uid: userId, // Include the logged-in user's UID here
      ...formData, // formData contains name, description, etc.
    };

    try {
      const response = await axios.post(
        "http://localhost:1987/api/recipient/update",
        null, // No request body, just URL parameters
        { params: data } // Send data as query parameters
      );
      alert(response.data); // Show success message
    } catch (error) {
      console.error("Error updating organization:", error.response || error.message);
      alert("Failed to update organization details");
    }
  };

  const handlePaymentNavigate = () => {
    navigate("/ro/payment");
  };

  return (
    <ROBase>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Update Organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Update Organization
          </button>
        </form>
        <div className="mt-6">
          <button
            onClick={handlePaymentNavigate}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Go to Payment
          </button>
        </div>
      </div>
    </ROBase>
  );
};

export default ROProfile;
