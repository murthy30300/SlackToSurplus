import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Search, Loader2, Users, Gift, Package, Award, ChevronUp, ChevronDown } from 'lucide-react';
import ReactPaginate from 'react-paginate';
import debounce from 'lodash.debounce';
import { FixedSizeList as List } from 'react-window';
import ABase from './ABase'

const AOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    type: "NGO",
    description: "",
    registrationNumber: "",
    headName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });

  const ITEMS_PER_PAGE = 10;

  // Stats calculation
  const stats = useMemo(() => ({
    total: organizations.length,
    ngos: organizations.filter(org => org.type === 'NGO').length,
    restaurants: organizations.filter(org => org.type === 'RESTAURANT').length,
    foodBanks: organizations.filter(org => org.type === 'FOOD_BANK').length,
  }), [organizations]);

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("slacktosurplus.up.railway.app/admin/organizations");
      setOrganizations(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch organizations. Please try again later.");
      toast.error("Error fetching organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Debounced search
  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  }, 300);

  // Sort function
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  // Filtered and sorted data
  const filteredAndSortedData = useMemo(() => {
    let result = [...organizations];

    // Filter
    if (searchQuery) {
      result = result.filter(org =>
        Object.values(org).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [organizations, searchQuery, sortConfig]);

  // Pagination
  const pageCount = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const currentPageData = filteredAndSortedData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // CRUD Operations
  const addOrganization = async () => {
    try {
      console.log("Form Data:", formData);
      await axios.post("slacktosurplus.up.railway.app/admin/organization", formData);
      toast.success("Organization added successfully!");
      fetchOrganizations();
      resetForm();
    } catch (error) {
      toast.error("Error adding organization");
    }
  };

  const updateOrganization = async () => {
    try {
      await axios.put(
        `slacktosurplus.up.railway.app/admin/organization/${editId}`,
        formData
      );
      toast.success("Organization updated successfully!");
      fetchOrganizations();
      resetForm();
    } catch (error) {
      toast.error("Error updating organization");
    }
  };

  const deleteOrganization = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organization?")) return;
    
    try {
      await axios.delete(`slacktosurplus.up.railway.app/admin/organization/${id}`);
      toast.success("Organization deleted successfully!");
      fetchOrganizations();
    } catch (error) {
      toast.error("Error deleting organization");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "NGO",
      description: "",
      registrationNumber: "",
      headName: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
    });
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateOrganization();
    } else {
      addOrganization();
    }
  };

  const handleEdit = (org) => {
    setEditId(org.oid);
    setFormData({ ...org });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render functions
  const renderStats = () => (
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Organizations</p>
            <p className="text-2xl font-semibold text-blue-700">{stats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <Gift className="w-8 h-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">NGOs</p>
            <p className="text-2xl font-semibold text-green-700">{stats.ngos}</p>
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <Package className="w-8 h-8 text-yellow-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Restaurants</p>
            <p className="text-2xl font-semibold text-yellow-700">{stats.restaurants}</p>
          </div>
        </div>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl shadow-sm">
        <div className="flex items-center">
          <Award className="w-8 h-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-600">Food Banks</p>
            <p className="text-2xl font-semibold text-purple-700">{stats.foodBanks}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-6">{editId ? 'Edit Organization' : 'Add New Organization'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="NGO">NGO</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="FOOD_BANK">Food Bank</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Head Name</label>
          <input
            type="text"
            name="headName"
            value={formData.headName}
            onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Donations</label>
          <input
            type="number"
            name="totalDonations"
            value={formData.totalDonations}
            onChange={(e) => setFormData({ ...formData, totalDonations: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Received</label>
          <input
            type="number"
            name="totalReceived"
            value={formData.totalReceived}
            onChange={(e) => setFormData({ ...formData, totalReceived: Number(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
          <input
            type="text"
            name="badge"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editId ? 'Update' : 'Add'} Organization
        </button>
      </div>
    </form>
  );
  

  const renderMobileView = () => (
    <div className="md:hidden space-y-4">
      {currentPageData.map((org) => (
        <div key={org.oid} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">{org.name}</h3>
          <p className="text-gray-600">{org.type}</p>
          <p className="text-gray-600 truncate">{org.description}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => handleEdit(org)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => deleteOrganization(org.oid)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {['Name', 'Type', 'Description', 'Registration', 'Head Name', 'Email', 'Phone', 'Address', 'Score', 'Actions'].map((header) => (
              <th
                key={header}
                onClick={() => handleSort(header.toLowerCase())}
                className="border p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <span>{header}</span>
                  {sortConfig.key === header.toLowerCase() && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((org, index) => (
            <tr key={org.oid} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border p-4 max-w-[200px] truncate">{org.name}</td>
              <td className="border p-4">{org.type}</td>
              <td className="border p-4 max-w-[300px] truncate">{org.description}</td>
              <td className="border p-4">{org.registrationNumber}</td>
              <td className="border p-4">{org.headName}</td>
              <td className="border p-4">{org.contactEmail}</td>
              <td className="border p-4">{org.contactPhone}</td>
              <td className="border p-4 max-w-[200px] truncate">{org.address}</td>
              <td className="border p-4">{org.score}</td>
              <td className="border p-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(org)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOrganization(org.oid)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <ABase>
    <div className="container mx-auto p-6">
      <Toaster position="top-right" />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Organizations Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search organizations..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {renderStats()}
      {renderForm()}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          {renderMobileView()}
          {renderDesktopView()}
          
          <div className="mt-6">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pageCount}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              containerClassName="flex justify-center space-x-2"
              pageClassName="px-3 py-1 rounded hover:bg-gray-100"
              previousClassName="px-3 py-1 rounded hover:bg-gray-100"
              nextClassName="px-3 py-1 rounded hover:bg-gray-100"
              activeClassName="bg-blue-600 text-white"
              disabledClassName="text-gray-400 cursor-not-allowed"
            />
          </div>
        </>
      )}
    </div>
    </ABase>
  );
};

export default AOrganization;