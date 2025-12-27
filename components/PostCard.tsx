import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Sparkles, MoreHorizontal, Cpu } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="relative mb-6 group">
      {/* Glow backing */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-anime-primary/20 to-anime-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative bg-anime-card border border-white/5 rounded-xl overflow-hidden shadow-xl">
        {/* Header - Tech Bar */}
        <div className="p-4 flex items-center justify-between bg-black/20 border-b border-white/5 relative">
          <div className="flex items-center space-x-3">
             <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-anime-primary to-anime-secondary rounded-full animate-spin-slow opacity-70"></div>
                <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-anime-dark relative z-10"
                />
             </div>
            <div>
              <h3 className="font-bold text-gray-200 text-sm tracking-wide">{post.author.name}</h3>
              <p className="text-[10px] text-anime-secondary font-mono uppercase">
                {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }).format(post.timestamp)}
                {' // '} 
                <span className="text-gray-500">NET.PUBLIC</span>
              </p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
          
          {/* Decorative Top Right Corner */}
          <div className="absolute top-0 right-0 w-8 h-8">
             <div className="absolute top-0 right-0 w-full h-[1px] bg-anime-primary/50"></div>
             <div className="absolute top-0 right-0 h-full w-[1px] bg-anime-primary/50"></div>
             <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-anime-primary/10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          {post.bookTag && (
            <div className="mb-3">
              <span className="bg-anime-primary/10 border border-anime-primary/30 text-anime-primary text-[10px] font-bold uppercase px-2 py-1 rounded flex items-center w-fit tracking-wider shadow-[0_0_10px_rgba(112,0,255,0.1)]">
                 <Cpu size={12} className="mr-1" /> Data: {post.bookTag}
              </span>
            </div>
          )}
          <p className={`text-gray-300 leading-relaxed whitespace-pre-wrap font-sans ${post.content.length < 100 ? 'text-lg font-light' : 'text-sm'}`}>
            {post.content}
          </p>
        </div>

        {/* Image Attachment */}
        {post.image && (
          <div className="mt-2 w-full h-64 sm:h-80 bg-black relative overflow-hidden group/img">
            <div className="absolute inset-0 bg-anime-secondary/10 z-10 mix-blend-overlay opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none"></div>
            <img src={post.image} alt="Post attachment" className="w-full h-full object-cover opacity-90 group-hover/img:scale-105 transition-transform duration-700 ease-out" />
            
            {/* HUD Overlay on Image */}
            <div className="absolute bottom-2 left-2 text-[10px] text-white/70 font-mono z-20 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">IMG_SEQ_092</div>
          </div>
        )}

        {/* AI Badge if applicable */}
        {post.isAiGenerated && (
          <div className="px-5 py-2 flex items-center text-[10px] text-anime-accent font-bold uppercase tracking-widest">
            <Sparkles size={12} className="mr-2 animate-pulse" />
            AI Generated Artifact
          </div>
        )}

        {/* Stats */}
        <div className="px-5 py-3 flex items-center justify-between text-[10px] text-gray-500 border-t border-white/5 bg-black/20 font-mono">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-anime-accent to-purple-800 rounded p-1 shadow-[0_0_5px_#ff00ff]">
              <Heart size={10} className="text-white fill-current" />
            </div>
            <span className="text-gray-300">{likesCount} SYNC</span>
          </div>
          <div>
            <span className="text-gray-300">{post.comments.length} RESPONSES</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between bg-black/30">
          <button 
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 transition-all hover:bg-white/5 relative overflow-hidden ${liked ? 'text-anime-accent' : 'text-gray-400'}`}
          >
            <Heart size={18} className={liked ? 'fill-current drop-shadow-[0_0_5px_#ff00ff]' : ''} />
            <span className="font-semibold text-xs uppercase tracking-wider">Like</span>
            {liked && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-anime-accent shadow-[0_0_10px_#ff00ff]"></div>}
          </button>
          
          <div className="w-[1px] h-6 bg-white/10"></div>
          
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-400 hover:text-anime-secondary hover:bg-white/5 transition-all">
            <MessageCircle size={18} />
            <span className="font-semibold text-xs uppercase tracking-wider">Comment</span>
          </button>

          <div className="w-[1px] h-6 bg-white/10"></div>

          <button className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Share2 size={18} />
            <span className="font-semibold text-xs uppercase tracking-wider">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};