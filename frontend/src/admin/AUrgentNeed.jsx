import React, { useState, useEffect } from "react";
import axios from "axios";
import ABase from './ABase'

const AUrgentNeed = () => {
  const [urgentNeeds, setUrgentNeeds] = useState([]);
  const [formData, setFormData] = useState({
    urid: 0,
    title: "",
    description: "",
    quantityNeeded: 0,
    neededBy: "",
    eventType: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data
  const fetchUrgentNeeds = async () => {
    try {
      const response = await axios.get("slacktosurplus.up.railway.app/admin/urgentNeeds");
      console.log(response.data)
      setUrgentNeeds(response.data);
      console.log('urgent needs***',urgentNeeds.urid)
    } catch (error) {
      console.error("Error fetching urgent needs:", error);
    }
  };

  useEffect(() => {
    fetchUrgentNeeds();
  }, []);

  // Handle form submission for Add/Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`slacktosurplus.up.railway.app/admin/urgentNeed/${formData.urid}`, formData);
      } else {
        await axios.post("slacktosurplus.up.railway.app/admin/urgentNeed", formData);
      }
      fetchUrgentNeeds();
      setFormData({
        urid: 0,
        title: "",
        description: "",
        quantityNeeded: 0,
        neededBy: "",
        eventType: "",
        isActive: true,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete
  const handleDelete = async (urid) => {
    try {
      await axios.delete(`slacktosurplus.up.railway.app/admin/urgentNeed/${urid}`);
      fetchUrgentNeeds();
    } catch (error) {
      console.error("Error deleting urgent need:", error);
    }
  };

  // Handle edit
  const handleEdit = (urgentNeed) => {
    setFormData({ ...urgentNeed });
    setIsEditing(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ABase>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Urgent Needs Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            name="quantityNeeded"
            value={formData.quantityNeeded}
            onChange={handleChange}
            placeholder="Quantity Needed"
            className="border rounded p-2"
            required
          />
          <input
            type="datetime-local"
            name="neededBy"
            value={formData.neededBy}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            placeholder="Event Type"
            className="border rounded p-2"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
              className="mr-2"
            />
            <label>Is Active</label>
          </div>
        </div>
        <button
          type="submit"
          className={`bg-${isEditing ? "yellow" : "blue"}-500 text-white px-4 py-2 rounded`}
        >
          {isEditing ? "Update" : "Add"} Urgent Need
        </button>
      </form>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Quantity Needed</th>
            <th className="border border-gray-300 px-4 py-2">Needed By</th>
            <th className="border border-gray-300 px-4 py-2">Event Type</th>
            <th className="border border-gray-300 px-4 py-2">Is Active</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urgentNeeds.length > 0 ? (
            urgentNeeds.map((urgentNeed) => (
              <tr key={urgentNeed.urid}>
                <td className="border border-gray-300 px-4 py-2">{urgentNeed.urid} </td>
                <td className="border border-gray-300 px-4 py-2">{urgentNeed.title}</td>
                <td className="border border-gray-300 px-4 py-2">{urgentNeed.description}</td>
                <td className="border border-gray-300 px-4 py-2">{urgentNeed.quantityNeeded}</td>
                <td className="border border-gray-300 px-4 py-2">{urgentNeed.neededBy}</td>
                <td className="border border-gray-300 px-4 py-2">{urgentNeed.eventType}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {urgentNeed.isActive ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => handleEdit(urgentNeed)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(urgentNeed.urid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No urgent needs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </ABase>
  );
};

export default AUrgentNeed;
