import React from 'react';
import { Post } from '../types';
import { PostCard } from './PostCard';

interface FeedProps {
  posts: Post[];
}

export const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <div className="w-full max-w-2xl mx-auto pb-20">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p>No posts yet. Be the first to write something!</p>
        </div>
      )}
    </div>
  );
};
