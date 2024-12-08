import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ABase from './ABase';

const APost = () => {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://slacktosurplus.up.railway.app/admin/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('caption', caption);
    if (image) formData.append('image', image);
    formData.append('uid', localStorage.getItem('uid')); // Assuming UID is stored in localStorage

    try {
      if (editingPostId) {
        // Update existing post
        await axios.put(
          `https://slacktosurplus.up.railway.app/admin/post/${editingPostId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Post updated successfully!');
      } else {
        // Create a new post
        await axios.post('https://slacktosurplus.up.railway.app/admin/post', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Post created successfully!');
      }

      setCaption('');
      setImage(null);
      setPreview(null);
      setEditingPostId(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating/updating post:', error.response?.data || error.message);
      toast.error('Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://slacktosurplus.up.railway.app/admin/post/${id}`);
      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post.');
    }
  };

  // Edit a post
  const handleEdit = (post) => {
    setCaption(post.caption);
    setEditingPostId(post.pid);
    setPreview(post.imageUrl); // Use existing image URL as preview
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <ABase>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Manage Posts</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {preview && (
              <div className="relative mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                >
                  X
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingPostId ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>

        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-gray-300 md:border-none block md:table-row">
              <th className="p-2 text-left md:table-cell">ID</th>
              <th className="p-2 text-left md:table-cell">Caption</th>
              <th className="p-2 text-left md:table-cell">Image</th>
              <th className="p-2 text-left md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {posts.map((post) => (
              <tr
                key={post.pid}
                className="border border-gray-300 md:border-none block md:table-row"
              >
                <td className="p-2 md:table-cell">{post.pid}</td>
                <td className="p-2 md:table-cell">{post.caption}</td>
                <td className="p-2 md:table-cell">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="p-2 md:table-cell space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.pid)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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

export default APost;
