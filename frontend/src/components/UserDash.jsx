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
        const postsWithLikeStatus = await Promise.all(
          response.data.map(async (post) => {
            const likeStatus = await axios.get(
              `http://localhost:1987/posts/${post.pid}/likes/status?profileId=${storedData?.user?.profile?.prid}`
            );
            return { ...post, isLiked: likeStatus.data };
          })
        );
        setPosts(postsWithLikeStatus);
      } catch (error) {
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (post) => {
    try {
      const profileId = storedData?.user?.profile?.prid;
      if (!profileId) return;

      if (post.isLiked) {
        await axios.delete(`http://localhost:1987/posts/${post.pid}/like/${profileId}`);
      } else {
        await axios.post(`http://localhost:1987/posts/${post.pid}/like?profileId=${profileId}`);
      }

      setPosts(currentPosts =>
        currentPosts.map(p =>
          p.pid === post.pid
            ? {
                ...p,
                likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
                isLiked: !p.isLiked
              }
            : p
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <Base toggleSection={toggleSection}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8 bg-gradient-to-r from-[#E7CCCC] to-[#F4D8D8] p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-[#4A4A4A]">
            Welcome, {storedData?.user?.username}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4C6CE7]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.pid} className="bg-[#F7EFEA] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Post Header */}
                  <div className="p-6 flex items-center justify-between border-b border-[#E7CCCC]">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={post.profilePicUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                          alt={post.username}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#E78F6C]"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#4A4A4A]">{post.username}</h3>
                        <p className="text-sm text-[#A5B77F]">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-[#4A4A4A] hover:text-[#4C6CE7] transition-colors duration-200">
                      <MoreHorizontal className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-6">
                    <p className="text-[#4A4A4A] text-lg mb-6 leading-relaxed">{post.caption}</p>
                    
                    {post.imageUrl && (
                      <div className="relative rounded-xl overflow-hidden mb-6">
                        <img
                          src={post.imageUrl}
                          alt="Post content"
                          className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E7CCCC]">
                      <button 
                        onClick={() => handleLike(post)}
                        className={`flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 ${
                          post.isLiked ? 'text-[#D32E28]' : 'text-[#4A4A4A] hover:text-[#D32E28]'
                        }`}
                      >
                        <Heart 
                          className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`}
                          strokeWidth={post.isLiked ? 1.5 : 2}
                        />
                        <span className="font-medium">{post.likeCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#F7EFEA] rounded-xl shadow-lg">
                <p className="text-[#4A4A4A]">No posts available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Base>
  );
};

export default UserDash;