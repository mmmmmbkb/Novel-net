import React, { useState } from 'react';
import { User, Post, LiteraryCharacter } from './types';
import { Feed } from './components/Feed';
import { CreatePost } from './components/CreatePost';
import { CharacterChat } from './components/CharacterChat';
import { 
  BookOpen, 
  Home, 
  Users, 
  Bell, 
  MessageSquare, 
  Menu, 
  Search, 
  Bookmark,
  TrendingUp,
  Ghost,
  Cpu,
  Zap
} from 'lucide-react';

// Mock Data
const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alice Reader',
  handle: '@alicereads',
  avatar: 'https://picsum.photos/id/64/150/150'
};

const MOCK_CHARACTERS: LiteraryCharacter[] = [
  {
    id: 'c1',
    name: 'Elizabeth Bennet',
    book: 'Pride and Prejudice',
    avatar: 'https://picsum.photos/id/338/100/100',
    personality: 'Witty, intelligent, independent, and slightly prejudiced.'
  },
  {
    id: 'c2',
    name: 'Sherlock Holmes',
    book: 'Sherlock Holmes',
    avatar: 'https://picsum.photos/id/433/100/100',
    personality: 'Highly analytical, observant, logical, socially detached, and arrogant.'
  },
  {
    id: 'c3',
    name: 'Jay Gatsby',
    book: 'The Great Gatsby',
    avatar: 'https://picsum.photos/id/447/100/100',
    personality: 'Optimistic, obsessive, charismatic, mysterious, and wealthy.'
  }
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Mark Page',
      handle: '@markpage',
      avatar: 'https://picsum.photos/id/91/150/150'
    },
    content: 'Just finished "The Midnight Library". What an incredible journey through possible lives! Has anyone else read it? The concept of the rootless existence really struck a chord with me.',
    likes: 42,
    comments: [
        { id: 'cm1', author: CURRENT_USER, content: 'Loved it!', timestamp: new Date() }
    ],
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    bookTag: 'The Midnight Library'
  },
  {
    id: 'p2',
    author: {
      id: 'u3',
      name: 'Sarah Story',
      handle: '@sarahstory',
      avatar: 'https://picsum.photos/id/129/150/150'
    },
    content: 'Can we talk about how good the classics are? Sometimes you just need to revisit 19th-century England.',
    image: 'https://picsum.photos/id/24/800/400',
    likes: 128,
    comments: [],
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
  }
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState<'home' | 'friends' | 'saved'>('home');
  const [activeCharacter, setActiveCharacter] = useState<LiteraryCharacter | null>(null);

  const handleCreatePost = (content: string, image?: string, isAi?: boolean, bookTag?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: CURRENT_USER,
      content,
      image,
      likes: 0,
      comments: [],
      timestamp: new Date(),
      isAiGenerated: isAi,
      bookTag
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen font-sans text-gray-200 overflow-x-hidden">
      
      {/* Navbar - Glass Tech Style */}
      <nav className="fixed w-full z-40 top-0 border-b border-white/10 bg-anime-dark/80 backdrop-blur-md shadow-[0_0_15px_rgba(112,0,255,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => setActiveTab('home')}>
                <div className="bg-gradient-to-tr from-anime-primary to-anime-accent p-2 rounded-none transform skew-x-[-10deg] hover:skew-x-0 transition-transform duration-300 shadow-[0_0_10px_#7000ff]">
                  <BookOpen size={24} className="text-white transform skew-x-[10deg] group-hover:skew-x-0" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-anime-secondary text-glow hidden sm:block">
                  NOVEL<span className="font-light">NET</span>
                </span>
              </div>
              
              {/* Search Bar - Sci-Fi Input */}
              <div className="hidden md:ml-10 md:flex md:space-x-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-anime-secondary group-focus-within:text-anime-accent transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-64 bg-anime-card/50 border border-white/10 text-gray-200 text-sm rounded-none pl-10 pr-3 py-1.5 focus:outline-none focus:border-anime-secondary focus:ring-1 focus:ring-anime-secondary transition-all clip-corner-br"
                    placeholder="Search database..."
                  />
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-anime-secondary opacity-50"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-anime-secondary hover:bg-white/5 transition-all relative group">
                <MessageSquare size={20} />
                <div className="absolute inset-0 border border-transparent group-hover:border-anime-secondary/30 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
              </button>
              <button className="p-2 text-gray-400 hover:text-anime-accent hover:bg-white/5 transition-all relative group">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-anime-accent shadow-[0_0_5px_#ff00ff]"></span>
              </button>
              
              <div className="relative p-[1px] bg-gradient-to-br from-anime-secondary to-anime-accent rounded-full">
                <div className="bg-anime-dark rounded-full p-[2px]">
                   <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={CURRENT_USER.avatar}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar (Navigation) */}
          <div className="hidden lg:block col-span-1">
            <div className="bg-anime-card/60 backdrop-blur-sm border-l-2 border-anime-primary/50 p-4 sticky top-24 clip-corner-tl relative overflow-hidden group">
              {/* Background decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              <div className="relative z-10 flex items-center space-x-3 mb-8 px-2">
                <div className="relative">
                  <img src={CURRENT_USER.avatar} alt="" className="h-12 w-12 rounded-full border-2 border-anime-secondary" />
                  <div className="absolute -bottom-1 -right-1 bg-anime-dark rounded-full p-0.5 border border-anime-secondary">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                    <span className="block font-bold text-white tracking-wide">{CURRENT_USER.name}</span>
                    <span className="text-xs text-anime-secondary font-mono tracking-widest uppercase">Lvl. 42 Reader</span>
                </div>
              </div>
              
              <nav className="space-y-2 relative z-10">
                {[
                    { id: 'home', icon: Home, label: 'Main Feed' },
                    { id: 'friends', icon: Users, label: 'Allies' },
                    { id: 'saved', icon: Bookmark, label: 'Archives' }
                ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-semibold transition-all duration-300 relative overflow-hidden group/btn ${activeTab === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      {/* Button Background Slide */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-anime-primary/20 to-transparent transform transition-transform duration-300 ${activeTab === item.id ? 'translate-x-0' : '-translate-x-full group-hover/btn:translate-x-0'}`}></div>
                      
                      {/* Active Indicator Line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-anime-accent transform transition-transform duration-300 ${activeTab === item.id ? 'scale-y-100' : 'scale-y-0'}`}></div>

                      <item.icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-anime-accent drop-shadow-[0_0_5px_#ff00ff]' : ''}`} />
                      <span className="relative z-10 uppercase tracking-wider text-xs">{item.label}</span>
                    </button>
                ))}
              </nav>

              <div className="mt-10 relative z-10">
                <h3 className="px-4 text-[10px] font-bold text-anime-secondary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Cpu size={12} /> Sync Status
                </h3>
                <div className="space-y-1 px-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/5">
                    <span>Current Read</span>
                    <span className="w-1.5 h-1.5 rounded-sm bg-green-400 shadow-[0_0_5px_#4ade80]"></span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/5">
                    <span>Queue</span>
                    <span className="w-1.5 h-1.5 rounded-sm bg-yellow-400 shadow-[0_0_5px_#facc15]"></span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-white/5">
                    <span>Hall of Fame</span>
                    <span className="w-1.5 h-1.5 rounded-sm bg-anime-accent shadow-[0_0_5px_#ff00ff]"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Feed */}
          <div className="col-span-1 lg:col-span-2">
            <CreatePost currentUser={CURRENT_USER} onPostCreate={handleCreatePost} />
            <Feed posts={posts} />
          </div>

          {/* Right Sidebar (Widgets) */}
          <div className="hidden lg:block col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Trending */}
              <div className="bg-anime-card/80 border border-white/10 p-5 relative overflow-hidden shadow-lg backdrop-blur-md">
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-anime-secondary"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-anime-secondary"></div>
                
                <h3 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <TrendingUp size={14} className="text-anime-accent" /> Trending Signal
                </h3>
                <ul className="space-y-4">
                  {[
                    { rank: '01', title: 'Fourth Wing', genre: 'Fantasy', count: '12k' },
                    { rank: '02', title: 'Yellowface', genre: 'Fiction', count: '8.5k' },
                    { rank: '03', title: 'Tomorrow x3', genre: 'Contemp', count: '6k' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 group cursor-pointer">
                      <div className="text-2xl font-black text-white/10 group-hover:text-anime-primary/50 transition-colors font-mono">{item.rank}</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-200 group-hover:text-anime-secondary transition-colors">{item.title}</p>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-gray-500 uppercase">{item.genre}</span>
                            <span className="text-[10px] text-anime-accent bg-anime-accent/10 px-1 rounded">{item.count}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Character Chat Widget */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-anime-primary to-anime-accent opacity-75 blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                <div className="relative bg-[#0a0a0f] border border-anime-primary/30 p-5 clip-corner-br">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-widest text-xs">
                        <Ghost size={14} className="text-anime-primary" /> Ghost Link
                    </h3>
                    <p className="text-[10px] text-gray-400 mb-4 font-mono">Establish neural link with fictional entities.</p>
                    
                    <div className="space-y-3">
                    {MOCK_CHARACTERS.map((char) => (
                        <div 
                        key={char.id} 
                        className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 border border-transparent hover:border-anime-secondary/30 transition-all cursor-pointer group/char"
                        onClick={() => setActiveCharacter(char)}
                        >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                            <img src={char.avatar} className="w-8 h-8 rounded-full border border-gray-600 group-hover/char:border-anime-secondary transition-colors" alt={char.name} />
                            </div>
                            <div>
                            <p className="text-xs font-bold text-gray-300 group-hover/char:text-white">{char.name}</p>
                            <p className="text-[10px] text-gray-600 truncate max-w-[100px] font-mono group-hover/char:text-anime-secondary">{char.book}</p>
                            </div>
                        </div>
                        <div className="opacity-0 group-hover/char:opacity-100 transition-opacity">
                            <Zap size={14} className="text-anime-accent" />
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-600 text-center font-mono">
                NOVELNET SYSTEM v2.0.24 • <span className="hover:text-anime-secondary cursor-pointer">LOGS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bottom - Cyber Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f13]/95 backdrop-blur-xl border-t border-anime-primary/20 z-50 px-6 py-3 flex justify-between items-center text-gray-500">
        <button className={`${activeTab === 'home' ? 'text-anime-secondary drop-shadow-[0_0_8px_rgba(0,234,255,0.5)]' : ''}`} onClick={() => setActiveTab('home')}>
            <Home size={24} />
        </button>
         <button className={`${activeTab === 'friends' ? 'text-anime-secondary drop-shadow-[0_0_8px_rgba(0,234,255,0.5)]' : ''}`} onClick={() => setActiveTab('friends')}>
            <Users size={24} />
        </button>
         <button className={`${activeTab === 'saved' ? 'text-anime-secondary drop-shadow-[0_0_8px_rgba(0,234,255,0.5)]' : ''}`} onClick={() => setActiveTab('saved')}>
            <Bookmark size={24} />
        </button>
        <button onClick={() => {}} className="text-anime-accent">
            <Menu size={24} />
        </button>
      </div>

      {/* Floating Chat Window */}
      {activeCharacter && (
        <CharacterChat 
          character={activeCharacter} 
          isOpen={!!activeCharacter} 
          onClose={() => setActiveCharacter(null)} 
        />
      )}
    </div>
  );
}