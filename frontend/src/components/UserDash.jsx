import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base from './Base';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const UserDash = () => {
  const [currentSection, setCurrentSection] = useState('hunger');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:1987/posts/home');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const toggleSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <Base toggleSection={toggleSection}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {storedData?.user?.username}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.profilePicUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt={post.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.username}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                   </div>
                  
                  {/* Post Image */}
                  {post.imageUrl && (
                    <div className="relative aspect-w-16 aspect-h-9">
                      <img
                        src={post.imageUrl}
                        alt="Post content"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-gray-800 mb-4">{post.caption}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5 mr-1" />
                          <span className="text-sm">{post.likeCount}</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5 mr-1" />
                          <span className="text-sm">Comment</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5 mr-1" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">No posts available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Base>
  );
};

export default UserDash;