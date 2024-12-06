import React, { useState, useEffect } from "react";
import axios from "axios";
import ABase from './ABase'

const AUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
  });

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1987/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.uid);
    setFormData({
      email: user.email,
      username: user.username,
      password: "", // Do not pre-fill password for security reasons
      role: user.role,
    });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setFormData({
      email: "",
      username: "",
      password: "",
      role: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:1987/admin/user/${editingUserId}`, formData);
      fetchUsers();
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1987/admin/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <ABase>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">UID</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td className="border border-gray-300 px-4 py-2">{user.uid}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.uid ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.uid ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.uid ? (
                  <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                  <option value="ORGANIZATION">ORGANIZATION</option>
                  <option value="DATA_ANALYST">DATA_ANALYST</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                
                ) : (
                  user.role
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingUserId === user.uid ? (
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(user.uid)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </ABase>
  );
};

export default AUser;
