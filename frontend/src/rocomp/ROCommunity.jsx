import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Heart, MessageCircle, Share2, ChevronRight, Filter } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from 'react-hot-toast';
import ROBase from './ROBase';

const ROCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://slacktosurplus.up.railway.app/api/recipient/organization-stories');
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (err) {
        setError('Error fetching success stories');
        toast.error('Failed to load stories');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.caption.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = async (postId) => {
    try {
      // Simulated like functionality
      toast.success('Story liked!');
    } catch (error) {
      toast.error('Failed to like story');
    }
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: 'Success Story',
        text: post.caption,
        url: window.location.href,
      }).catch(() => {
        toast.error('Failed to share story');
      });
    } else {
      toast.error('Sharing not supported on this device');
    }
  };

  if (loading) {
    return (
      <ROBase>
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-blue-600" />
          </motion.div>
        </div>
      </ROBase>
    );
  }

  if (error) {
    return (
      <ROBase>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </ROBase>
    );
  }

  return (
    <ROBase>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/RODashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <li className="text-blue-600">Community Stories</li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-gray-600">Discover inspiring stories from our community</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="donation">Donations</option>
              <option value="event">Events</option>
              <option value="impact">Impact</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stories Grid */}
        <AnimatePresence>
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600">No stories found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.pid}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {post.imageUrl && (
                    <div className="relative aspect-video">
                      <LazyLoadImage
                        src={post.imageUrl}
                        alt={post.caption}
                        effect="blur"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <motion.div
                      className={`prose ${
                        expandedPost === post.pid ? 'line-clamp-none' : 'line-clamp-3'
                      }`}
                    >
                      <p className="text-gray-800">{post.caption}</p>
                    </motion.div>
                    {post.caption.length > 150 && (
                      <button
                        onClick={() => setExpandedPost(expandedPost === post.pid ? null : post.pid)}
                        className="text-blue-600 hover:text-blue-700 text-sm mt-2"
                      >
                        {expandedPost === post.pid ? 'Show less' : 'Read more'}
                      </button>
                    )}
                    <div className="mt-4 text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <button
                        onClick={() => handleLike(post.pid)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likes || 0}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments || 0}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </ROBase>
  );
};

export default ROCommunity;