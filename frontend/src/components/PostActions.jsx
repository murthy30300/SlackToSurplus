import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useLikes } from './hooks/uselikes';

const PostActions = ({ post, profileId }) => {
  const { likeCount, isLiked, toggleLike } = useLikes(post.likeCount);

  const handleLikeClick = async () => {
    await toggleLike(post.pid, profileId);
  };

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center space-x-6">
        <button 
          onClick={handleLikeClick}
          className={`flex items-center transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm">{likeCount}</span>
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
  );
};

export default PostActions;