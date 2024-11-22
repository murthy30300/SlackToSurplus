import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../App.css";
const storedData = JSON.parse(localStorage.getItem("user"));
const FOOD_TYPES = {
  COOKED: "COOKED",
  RAW: "RAW",
  PACKAGED: "PACKAGED",
  BEVERAGES: "BEVERAGES",
  BAKERY: "BAKERY",
  PRODUCE: "PRODUCE",
  OTHER: "OTHER",
};

const PACKAGING_TYPES = {
  CONTAINER: "CONTAINER",
  BOX: "BOX",
  BAG: "BAG",
  WRAPPED: "WRAPPED",
  NONE: "NONE",
};

const OFFER_STATUS = {
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  COMPLETED: "COMPLETED",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
};

const DONATION_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  IN_TRANSIT: "IN_TRANSIT",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

function Donate() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    description: "",
    location: "",
    expiryDate: new Date(),
    packagingType: "",
    pickupInstructions: "",
    isPerishable: false,
    dietaryNotes: "",
    offerStatus: OFFER_STATUS.AVAILABLE,
    donationStatus: DONATION_STATUS.PENDING,
    pickuptime: "",
    completedAt: "",
    notes: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // To track submission success/failure

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      expiryDate: date,
    }));
  };
  // Retrieve the UID from localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve username from localStorage
    const username = storedData.user.username;
    if (!username) {
      console.error("User is not logged in.");
      setSubmissionStatus("error");
      return;
    }
  
    // Format data to match backend requirements
    const formattedData = {
      username, // Pass username directly
      foodOffer: {
        foodType: formData.foodType,
        quantity: formData.quantity,
        description: formData.description,
        location: formData.location,
        expiryDate: formData.expiryDate.toISOString(), // Convert date to ISO format
        packagingType: formData.packagingType,
        pickupInstructions: formData.pickupInstructions,
        isPerishable: formData.isPerishable,
        dietaryNotes: formData.dietaryNotes,
        status: formData.donationStatus,
      },
    };
  
    try {
      // Send POST request to the backend
      const response = await axios.post(
        "http://localhost:1987/foodOffers",
        formattedData
      );
      console.log("Form submitted:", response.data);
      setSubmissionStatus("success");
  
      // Reset the form on success
      setFormData({
        foodType: "",
        quantity: "",
        description: "",
        location: "",
        expiryDate: new Date(),
        packagingType: "",
        pickupInstructions: "",
        isPerishable: false,
        dietaryNotes: "",
        offerStatus: OFFER_STATUS.AVAILABLE,
        donationStatus: DONATION_STATUS.PENDING,
        pickuptime: "",
        completedAt: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setSubmissionStatus("error");
    }
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Food Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(FOOD_TYPES).map((type) => (
                <button
                  key={type}
                  className={`p-4 rounded-lg border ${
                    formData.foodType === type
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, foodType: type }));
                    nextStep();
                  }}
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Food Details</h2>
            <div>
              <label className="block mb-2">Quantity (servings)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Number of servings"
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Describe the food items"
                rows="3"
              />
            </div>
            <div>
              <label className="block mb-2">Expiry Date</label>
              <DatePicker
                selected={formData.expiryDate}
                onChange={handleDateChange}
                className="w-full p-2 border rounded"
                minDate={new Date()}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Packaging & Location</h2>
            <div>
              <label className="block mb-2">Packaging Type</label>
              <select
                name="packagingType"
                value={formData.packagingType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select packaging type</option>
                {Object.values(PACKAGING_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter pickup location"
              />
            </div>
            <div>
              <label className="block mb-2">Pickup Instructions</label>
              <textarea
                name="pickupInstructions"
                value={formData.pickupInstructions}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter pickup instructions"
                rows="3"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPerishable"
                checked={formData.isPerishable}
                onChange={handleInputChange}
                id="isPerishable"
              />
              <label htmlFor="isPerishable">Is this food perishable?</label>
            </div>
            <div>
              <label className="block mb-2">Dietary Notes</label>
              <textarea
                name="dietaryNotes"
                value={formData.dietaryNotes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter any dietary notes or restrictions"
                rows="2"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit Donation
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {submissionStatus === "success" && (
        <div className="text-green-500">Donation submitted successfully!</div>
      )}
      {submissionStatus === "error" && (
        <div className="text-red-500">Error submitting donation.</div>
      )}
      <div className="mb-8">{renderStep()}</div>
    </div>
  );
}

export default Donate;
