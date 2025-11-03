import React, { useEffect, useState } from "react";
import axios from "axios";
import ABase from './ABase'
import CONFIG from "../config";
const AProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    prid: 0,
    uid: 0, // Represents the associated User's ID
    name: "",
    username: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    score: 0,
    profilePicUrl: "",
    bannerPicUrl: "",
    totalDonations: 0,
    totalReceived: 0,
    badge: "",
    createdAt: "",
    updatedAt: "",
  });

  // Fetch all profiles
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${CONFIG.API_BASE_URL}/admin/profiles`);
      console.log(response.data)
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (profile) => {
    setEditingId(profile.prid);
    setFormData(profile);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update profile
        await axios.put(`${CONFIG.API_BASE_URL}/admin/profile/${editingId}`, formData);
      } else {
        // Add new profile
        await axios.post("/admin/profile", formData);
      }
      fetchProfiles();
      setEditingId(null);
      setFormData({
        prid: null,
        uid: null,
        name: "",
        username: "",
        dateOfBirth: "",
        phone: "",
        address: "",
        score: 0,
        profilePicUrl: "",
        bannerPicUrl: "",
        totalDonations: 0,
        totalReceived: 0,
        badge: "",
        createdAt: "",
        updatedAt: "",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${CONFIG.API_BASE_URL}/admin/profile/${id}`);
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <ABase>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">PRID</th>
            <th className="border border-gray-300 px-4 py-2">UID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
            <th className="border border-gray-300 px-4 py-2">Profile Pic</th>
            <th className="border border-gray-300 px-4 py-2">Banner Pic</th>
            <th className="border border-gray-300 px-4 py-2">
              Total Donations
            </th>
            <th className="border border-gray-300 px-4 py-2">Total Received</th>
            <th className="border border-gray-300 px-4 py-2">Badge</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Updated At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(profiles) && profiles.length > 0 ? (
    profiles.map((profile) => (
      <tr key={profile.prid}>
        <td className="border border-gray-300 px-4 py-2">{profile.prid}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.uid}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.name}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.username}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.dateOfBirth}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.phone}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.address}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.score}</td>
        <td className="border border-gray-300 px-4 py-2"> <img src={profile.profilePicUrl}/></td>
        <td className="border border-gray-300 px-4 py-2"><img src={profile.bannerPicUrl}/></td>
        <td className="border border-gray-300 px-4 py-2">{profile.totalDonations}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.totalReceived}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.badge}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.createdAt}</td>
        <td className="border border-gray-300 px-4 py-2">{profile.updatedAt}</td>
        <td className="border border-gray-300 px-4 py-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
            onClick={() => handleEdit(profile)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDelete(profile.prid)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="15" className="text-center py-4">
        No profiles found.
      </td>
    </tr>
  )}
</tbody>

      </table>

      <div className="mt-6">
        <h2 className="text-xl font-bold">
          {editingId ? "Edit Profile" : "Add Profile"}
        </h2>
        <form
          className="grid grid-cols-2 gap-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            name="uid"
            value={formData.uid || ""}
            onChange={handleInputChange}
            placeholder="UID"
            className="border px-4 py-2"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border px-4 py-2"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border px-4 py-2"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            className="border px-4 py-2"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border px-4 py-2"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border px-4 py-2"
          />
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
            placeholder="Score"
            className="border px-4 py-2"
          />
          <input
            type="text"
            name="profilePicUrl"
            value={formData.profilePicUrl}
            onChange={handleInputChange}
            placeholder="Profile Picture URL"
            className="border px-4 py-2"
          />
          <input
            type="text"
            name="bannerPicUrl"
            value={formData.bannerPicUrl}
            onChange={handleInputChange}
            placeholder="Banner Picture URL"
            className="border px-4 py-2"
          />
          <input
            type="number"
            name="totalDonations"
            value={formData.totalDonations}
            onChange={handleInputChange}
            placeholder="Total Donations"
            className="border px-4 py-2"
          />
          <input
            type="number"
            name="totalReceived"
            value={formData.totalReceived}
            onChange={handleInputChange}
            placeholder="Total Received"
            className="border px-4 py-2"
          />
          <input
            type="text"
            name="badge"
            value={formData.badge}
            onChange={handleInputChange}
            placeholder="Badge"
            className="border px-4 py-2"
          />
          <input
            type="datetime-local"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleInputChange}
            placeholder="Created At"
            className="border px-4 py-2"
          />
          <input
            type="datetime-local"
            name="updatedAt"
            value={formData.updatedAt}
            onChange={handleInputChange}
            placeholder="Updated At"
            className="border px-4 py-2"
          />
          <button
            type="submit"
            className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
    </ABase>
  );
};

export default AProfile;
