import React, { useState, useEffect } from "react";
import axios from "axios";
import ABase from './ABase'
const AFoodOffer = () => {
  const [foodOffers, setFoodOffers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    quantity: "",
    expiryDate: "",
    foodType: "COOKED", // Default to the first enum value
    packagingType: "CONTAINER", // Default to the first enum value
    pickupInstructions: "",
    perishable: false,
    dietaryNotes: "",
    status: "",
    latitude: "",
    longitude: "",
  });

  const fetchFoodOffers = async () => {
    try {
      const response = await axios.get("http://localhost:1987/admin/foodOffers");
      setFoodOffers(response.data);
    } catch (error) {
      console.error("Error fetching food offers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addFoodOffer = async () => {
    try {
      await axios.post("http://localhost:1987/admin/foodOffer", formData);
      alert("Food offer added successfully!");
      fetchFoodOffers();
      resetForm();
    } catch (error) {
      console.error("Error adding food offer:", error);
    }
  };

  const updateFoodOffer = async () => {
    try {
      await axios.put(`http://localhost:1987/admin/foodOffer/${editId}`, formData);
      alert("Food offer updated successfully!");
      fetchFoodOffers();
      setEditId(null);
      resetForm();
    } catch (error) {
      console.error("Error updating food offer:", error);
    }
  };

  const deleteFoodOffer = async (id) => {
    try {
      await axios.delete(`http://localhost:1987/admin/foodOffer/${id}`);
      alert("Food offer deleted successfully!");
      fetchFoodOffers();
    } catch (error) {
      console.error("Error deleting food offer:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      description: "",
      location: "",
      quantity: "",
      expiryDate: "",
      foodType: "COOKED",
      packagingType: "CONTAINER",
      pickupInstructions: "",
      perishable: false,
      dietaryNotes: "",
      status: "",
      latitude: "",
      longitude: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateFoodOffer();
    } else {
      addFoodOffer();
    }
  };

  const handleEdit = (offer) => {
    setEditId(offer.id);
    setFormData({ ...offer });
  };

  useEffect(() => {
    fetchFoodOffers();
  }, []);

  return (
    <ABase>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Food Offers</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          {["COOKED", "RAW", "PACKAGED", "BEVERAGES", "BAKERY", "PRODUCE", "OTHER"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          name="packagingType"
          value={formData.packagingType}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          {["CONTAINER", "BOX", "BAG", "WRAPPED", "NONE"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editId ? "Update" : "Add"} Food Offer
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </form>

      <table className="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Expiry Date</th>
            <th className="border p-2">Food Type</th>
            <th className="border p-2">Packaging</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodOffers.map((offer) => (
            <tr key={offer.id} className="hover:bg-gray-100">
              <td className="border p-2">{offer.foid}</td>
              <td className="border p-2">{offer.description}</td>
              <td className="border p-2">{offer.location}</td>
              <td className="border p-2">{offer.quantity}</td>
              <td className="border p-2">{new Date(offer.expiryDate).toLocaleDateString()}</td>
              <td className="border p-2">{offer.foodType}</td>
              <td className="border p-2">{offer.packagingType}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(offer)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFoodOffer(offer.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </ABase>
  );
};

export default AFoodOffer;
