import React, { useState } from 'react';
import { User } from '../types';
import { Image, Wand2, Send, X, Loader2, Sparkles, Terminal } from 'lucide-react';
import { generatePostContent } from '../services/geminiService';

interface CreatePostProps {
  currentUser: User;
  onPostCreate: (content: string, image?: string, isAi?: boolean, bookTag?: string) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onPostCreate }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('witty');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bookTag, setBookTag] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;
    onPostCreate(content, undefined, isAiMode, bookTag);
    setContent('');
    setBookTag('');
    setIsExpanded(false);
    setIsAiMode(false);
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    const generated = await generatePostContent(aiPrompt, aiTone);
    setContent(generated);
    setIsGenerating(false);
    setIsAiMode(false);
    setIsExpanded(true);
  };

  return (
    <div className="bg-anime-card border border-anime-primary/30 rounded-lg shadow-[0_0_10px_rgba(112,0,255,0.1)] mb-8 p-1 relative overflow-hidden">
      {/* Decorative Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-0 opacity-20"></div>

      <div className="bg-[#0f0f13] relative z-10 rounded p-4">
        <div className="flex space-x-3">
            <div className="relative">
                <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-10 h-10 rounded clip-hex border border-anime-secondary/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                />
            </div>
          <div className="flex-1">
            <div 
              className={`bg-anime-surface/50 border border-white/5 rounded-none px-4 py-3 cursor-text hover:border-anime-secondary/50 transition-colors text-sm font-mono ${!content ? 'text-gray-500' : 'text-gray-200'}`}
              onClick={() => setIsExpanded(true)}
            >
              <span className="text-anime-secondary mr-2">{'>'}</span>
              {content ? <span className="text-gray-200">{content}</span> : `Initialize thoughts, ${currentUser.name.split(' ')[0]}...`}
              <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-anime-secondary align-middle"></span>
            </div>
          </div>
        </div>

        {/* Expanded Editor */}
        {isExpanded && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
             <textarea
              className="w-full p-3 bg-black/50 border border-anime-secondary/20 focus:border-anime-secondary focus:shadow-[0_0_10px_rgba(0,234,255,0.2)] focus:outline-none resize-none text-sm text-gray-200 font-mono min-h-[100px] rounded-sm"
              placeholder="Input data stream..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
            
            <div className="flex items-center gap-2 mt-2 bg-black/30 p-1 border-b border-white/5">
                <span className="text-xs text-gray-500 font-mono pl-2">REF:</span>
                <input 
                    type="text" 
                    placeholder="Enter Book ID tag..." 
                    className="text-xs bg-transparent border-none focus:outline-none px-1 py-1 text-anime-secondary w-1/2 font-mono placeholder-gray-700"
                    value={bookTag}
                    onChange={(e) => setBookTag(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-between mt-4 pt-2">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-anime-secondary hover:bg-anime-secondary/10 rounded transition-colors" title="Add Image">
                  <Image size={18} />
                </button>
                <button 
                  className="p-2 text-anime-accent hover:text-white hover:bg-anime-accent/20 rounded transition-colors flex items-center gap-2 px-3 border border-transparent hover:border-anime-accent/50"
                  onClick={() => setIsAiMode(true)}
                >
                  <Wand2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI Assist</span>
                </button>
              </div>
              <button 
                onClick={handlePost}
                disabled={!content.trim()}
                className="bg-anime-primary hover:bg-anime-primary/80 text-white px-6 py-1.5 rounded-sm font-bold text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all shadow-[0_0_10px_#7000ff] hover:shadow-[0_0_20px_#7000ff]"
              >
                Transmit <Send size={12} className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Assistant Modal Overlay */}
      {isAiMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-anime-dark border border-anime-accent/50 w-full max-w-md p-0 shadow-[0_0_30px_rgba(255,0,255,0.2)] animate-in zoom-in-95 duration-200 relative overflow-hidden">
            {/* Header */}
            <div className="bg-anime-accent/10 border-b border-anime-accent/30 p-4 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest font-mono">
                <Terminal size={16} className="text-anime-accent" /> Muse.AI_Protocol
              </h3>
              <button onClick={() => setIsAiMode(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
              <div>
                <label className="block text-[10px] font-bold text-anime-secondary uppercase mb-2 tracking-widest">Target Parameter (Topic)</label>
                <input 
                  type="text" 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Review of Pride and Prejudice..."
                  className="w-full p-3 bg-black/50 border border-gray-700 focus:border-anime-accent text-white text-sm font-mono focus:ring-1 focus:ring-anime-accent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-anime-secondary uppercase mb-2 tracking-widest">Modulation (Tone)</label>
                <div className="flex flex-wrap gap-2">
                  {['Excited', 'Critical', 'Poetic', 'Funny', 'Sarcastic'].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setAiTone(tone)}
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider border transition-all skew-x-[-10deg] ${
                        aiTone === tone 
                          ? 'bg-anime-accent text-black border-anime-accent shadow-[0_0_10px_#ff00ff]' 
                          : 'bg-transparent text-gray-400 border-gray-700 hover:border-anime-accent hover:text-white'
                      }`}
                    >
                      <span className="block skew-x-[10deg]">{tone}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full py-3 bg-gradient-to-r from-anime-primary to-anime-accent text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 disabled:grayscale mt-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Execute Generation
                  </>
                )}
              </button>
            </div>
            
            {/* Corner Deco */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-anime-accent"></div>
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-anime-accent"></div>
          </div>
        </div>
      )}
    </div>
  );
};