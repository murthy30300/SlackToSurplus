import { useState } from 'react';
import axios from 'axios';

export const useLikes = (initialLikeCount = 0, initialIsLiked = false) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const toggleLike = async (postId, profileId) => {
    try {
      if (isLiked) {
        await axios.delete(`http://localhost:1987/posts/${postId}/like/${profileId}`);
        setLikeCount(prev => prev - 1);
      } else {
        await axios.post(`http://localhost:1987/posts/${postId}/like?profileId=${profileId}`);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return { likeCount, isLiked, toggleLike };
};