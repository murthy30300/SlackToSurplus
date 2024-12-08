import React, { useState } from 'react';
import axios from 'axios';
import Base from './Base';
import { Image, X } from 'lucide-react';

const Post = () => {
  const [post, setPost] = useState({ caption: '', media: null });
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const storedData = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    if (e.target.id === 'caption') {
      setPost(prev => ({ ...prev, caption: e.target.value }));
    } else if (e.target.id === 'media' && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPost(prev => ({ ...prev, media: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!storedData?.user?.uid) {
      setMessage('User data is incomplete. Cannot fetch User ID.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', post.caption);
    if (post.media) {
      formData.append('image', post.media);
    }
    formData.append('userId', storedData.user.uid);

    try {
      await axios.post('slacktosurplus.up.railway.app/posts/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Post created successfully!');
      setPost({ caption: '', media: null });
      setPreview(null);
    } catch (error) {
      setMessage(`Failed to create post. Error: ${error.message}`);
    }
  };

  const removeMedia = () => {
    setPost(prev => ({ ...prev, media: null }));
    setPreview(null);
  };

  return (
    <Base>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Post</h2>
          
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handlePost} className="space-y-6">
            <div>
              <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
                What's on your mind?
              </label>
              <textarea
                id="caption"
                value={post.caption}
                onChange={handleChange}
                required
                placeholder="Write something..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <label
                  htmlFor="media"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Image className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">Add Photo</span>
                </label>
                <input
                  type="file"
                  id="media"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>

              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeMedia}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default Post;