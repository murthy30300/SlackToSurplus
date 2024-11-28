import React, { useState } from 'react';
import axios from 'axios';
import { Image, Loader2 } from 'lucide-react';
import ROBase from './ROBase';

const ROStories = () => {
  const [story, setStory] = useState({
    content: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStory(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('roUser'));
      const formData = new FormData();
      formData.append('organizationId', user.id);
      formData.append('story', story.content);
      if (story.image) {
        formData.append('image', story.image);
      }

      await axios.post('http://localhost:1987/api/recipient/success-story', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Success story posted!');
      setStory({ content: '', image: null });
      setPreview(null);
    } catch (error) {
      alert('Failed to post success story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ROBase>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Share Success Story</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Story
              </label>
              <textarea
                value={story.content}
                onChange={(e) => setStory(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your impact story..."
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <Image className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
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
                  onClick={() => {
                    setPreview(null);
                    setStory(prev => ({ ...prev, image: null }));
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Share Story'
              )}
            </button>
          </div>
        </form>
      </div>
    </ROBase>
  );
};

export default ROStories;