import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import {
  Utensils, Package, Box, ShoppingBag, XCircle,
  Coffee, Apple, Cookie, Carrot, MoreHorizontal, ChevronRight,
  MapPin, Clock, AlertCircle, Info
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Base from './Base'
//wrap and ban not found

const FOOD_TYPES = {
  COOKED: { label: "Cooked", icon: <Utensils className="w-6 h-6" /> },
  RAW: { label: "Raw", icon: <Apple className="w-6 h-6" /> },
  PACKAGED: { label: "Packaged", icon: <Box className="w-6 h-6" /> },
  BEVERAGES: { label: "Beverages", icon: <Coffee className="w-6 h-6" /> },
  BAKERY: { label: "Bakery", icon: <Cookie className="w-6 h-6" /> },
  PRODUCE: { label: "Produce", icon: <Carrot className="w-6 h-6" /> },
  OTHER: { label: "Other", icon: <MoreHorizontal className="w-6 h-6" /> },
};

const PACKAGING_TYPES = {
  CONTAINER: { label: "Container", icon: <Package className="w-6 h-6" /> },
  BOX: { label: "Box", icon: <Box className="w-6 h-6" /> },
  BAG: { label: "Bag", icon: <ShoppingBag className="w-6 h-6" /> },
  WRAPPED: { label: "Wrapped", icon: <Box className="w-6 h-6" /> },
  NONE: { label: "None", icon: <XCircle className="w-6 h-6" /> },
};

const DIETARY_SUGGESTIONS = ["Vegan", "Vegetarian", "Gluten-Free", "Halal", "Kosher", "Dairy-Free"];

function Donate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [currentLocation, setCurrentLocation] = useState(null);
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
    status: "PENDING",
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addDietarySuggestion = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      dietaryNotes: prev.dietaryNotes
        ? `${prev.dietaryNotes}, ${suggestion}`
        : suggestion,
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return !!formData.foodType;
      case 2:
        return (
          formData.quantity > 0 &&
          formData.description.length >= 10 &&
          formData.expiryDate > new Date()
        );
      case 3:
        return (
          !!formData.packagingType &&
          !!formData.location &&
          formData.pickupInstructions.length >= 10
        );
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = JSON.parse(
      localStorage.getItem("user") || '{"user":{"uid":""}}'
    );
    const username = storedData.user.username;
    
    if (!username) {
      toast.error("Please log in to submit a donation");
      return;
    }

    try {
      console.log("Username:", username);

      const response = await axios.post("slacktosurplus.up.railway.app/foodOffers", {
        username,
        foodOffer: formData,
      });
      
      toast.success("Donation submitted successfully!");
      setTimeout(() => navigate("/UserDash"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting donation");
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {["Food Type", "Details", "Pickup Info"].map((label, index) => (
          <div
            key={label}
            className={`flex items-center ${
              index + 1 === step ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= step ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-2">{label}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderBreadcrumb = () => (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/UserDash"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </a>
        </li>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <li className="text-blue-600">Donate Food</li>
      </ol>
    </nav>
  );

  return (
    <Base>
    <div className="max-w-2xl mx-auto p-6">
      <Toaster position="top-right" />
      {renderBreadcrumb()}
      {renderProgressBar()}

      <div className="bg-white rounded-xl shadow-lg p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Food Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(FOOD_TYPES).map(([type, { label, icon }]) => (
                <button
                  key={type}
                  className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all ${
                    formData.foodType === type
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, foodType: type }));
                    nextStep();
                  }}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Food Details</h2>
            <div>
              <label className="block mb-2">
                Quantity (servings)
                <Info
                  className="inline-block ml-2 w-4 h-4 text-gray-400"
                  data-tooltip-id="quantity-tip"
                />
              </label>
              <Tooltip
                id="quantity-tip"
                content="Estimate the number of people this donation can feed"
              />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Number of servings"
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the food items in detail"
                rows="3"
              />
              {formData.description.length < 10 && (
                <p className="text-red-500 text-sm mt-1">
                  Description must be at least 10 characters
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Expiry Date</label>
              <DatePicker
                selected={formData.expiryDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, expiryDate: date }))
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                minDate={new Date()}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Pickup Information</h2>
            
            <div>
              <label className="block mb-2">Packaging Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(PACKAGING_TYPES).map(([type, { label, icon }]) => (
                  <button
                    key={type}
                    className={`p-4 rounded-lg border flex flex-col items-center space-y-2 transition-all ${
                      formData.packagingType === type
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-white hover:bg-gray-50 border-gray-200"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, packagingType: type }))
                    }
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">Location</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pickup location"
                />
                <button
                  onClick={() => {
                    if (currentLocation) {
                      setFormData((prev) => ({
                        ...prev,
                        location: `${currentLocation.lat}, ${currentLocation.lng}`,
                      }));
                    }
                  }}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2">Pickup Instructions</label>
              <textarea
                name="pickupInstructions"
                value={formData.pickupInstructions}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Provide detailed pickup instructions"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">Dietary Notes</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {DIETARY_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => addDietarySuggestion(suggestion)}
                    className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <textarea
                name="dietaryNotes"
                value={formData.dietaryNotes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Add any dietary notes or restrictions"
                rows="2"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPerishable"
                checked={formData.isPerishable}
                onChange={handleInputChange}
                id="isPerishable"
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="isPerishable" className="flex items-center">
                <span>This food is perishable</span>
                <AlertCircle
                  className="ml-2 w-4 h-4 text-gray-400"
                  data-tooltip-id="perishable-tip"
                />
              </label>
              <Tooltip
                id="perishable-tip"
                content="Perishable foods need to be picked up quickly"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={nextStep}
              disabled={!validateStep()}
              className={`px-6 py-2 rounded-lg ${
                validateStep()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-200 cursor-not-allowed"
              } transition-colors ml-auto`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!validateStep()}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-auto"
            >
              Submit Donation
            </button>
          )}
        </div>
      </div>
    </div>
    </Base>
  );
}

export default Donate;