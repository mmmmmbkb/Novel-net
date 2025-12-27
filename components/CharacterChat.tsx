import React, { useState, useEffect, useRef } from 'react';
import { LiteraryCharacter, ChatMessage } from '../types';
import { X, Minimize2, Send, Loader2, Radio } from 'lucide-react';
import { chatWithCharacter } from '../services/geminiService';

interface CharacterChatProps {
  character: LiteraryCharacter;
  onClose: () => void;
  isOpen: boolean;
}

export const CharacterChat: React.FC<CharacterChatProps> = ({ character, onClose, isOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setMessages([
            {
                id: 'init',
                sender: 'character',
                text: `Connection established. I am ${character.name}. Speak your mind.`,
                timestamp: new Date()
            }
        ]);
    }
  }, [isOpen, character, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
        parts: [{ text: m.text }]
    }));
    
    const responseText = await chatWithCharacter(
        character.name,
        character.book,
        character.personality,
        userMsg.text,
        history
    );

    const characterMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'character',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, characterMsg]);
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 bg-anime-dark/95 backdrop-blur-xl border border-anime-primary/50 flex flex-col z-50 animate-in slide-in-from-bottom-10 fade-in duration-300 shadow-[0_0_30px_rgba(112,0,255,0.3)] clip-corner-tl">
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-anime-accent to-transparent"></div>
      
      {/* Header */}
      <div className="bg-black/40 p-3 flex justify-between items-center border-b border-white/10 relative overflow-hidden">
         {/* Animated signal bars */}
         <div className="absolute top-0 right-10 flex gap-1 h-full opacity-20">
             <div className="w-1 bg-anime-secondary h-full animate-pulse"></div>
             <div className="w-1 bg-anime-secondary h-3/4 self-end animate-pulse" style={{animationDelay: '0.1s'}}></div>
             <div className="w-1 bg-anime-secondary h-1/2 self-end animate-pulse" style={{animationDelay: '0.2s'}}></div>
         </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <img src={character.avatar} alt={character.name} className="w-10 h-10 rounded border-2 border-anime-primary" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-anime-secondary border border-black transform rotate-45"></div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white tracking-widest uppercase text-glow">{character.name}</h4>
            <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[9px] text-anime-secondary/80 font-mono tracking-wider">ONLINE // {character.book.substring(0, 15)}...</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 relative z-10">
          <button className="p-1 text-gray-400 hover:text-white hover:bg-white/10" onClick={onClose}>
            <Minimize2 size={16} />
          </button>
          <button className="p-1 text-gray-400 hover:text-anime-accent hover:bg-white/10" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area - Visual Novel Style */}
      <div className="h-80 overflow-y-auto p-4 flex flex-col gap-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
             <span className="text-[9px] text-gray-500 font-mono mb-1 uppercase">
                {msg.sender === 'user' ? 'YOU' : 'ENTITY'} // {new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute:'2-digit', hour12: false}).format(msg.timestamp)}
             </span>
            <div className={`max-w-[85%] px-4 py-3 text-sm relative border ${
              msg.sender === 'user' 
                ? 'bg-anime-primary/20 border-anime-primary/50 text-white rounded-tl-xl rounded-br-xl rounded-bl-sm rounded-tr-sm' 
                : 'bg-black/60 border-anime-secondary/30 text-gray-200 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm'
            }`}>
              {msg.text}
              
              {/* Corner accent */}
              <div className={`absolute w-2 h-2 border-t border-r ${msg.sender === 'user' ? 'border-anime-primary top-0 right-0' : 'border-anime-secondary top-0 right-0'}`}></div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center gap-2">
             <div className="bg-black/60 px-3 py-2 border border-anime-secondary/30 flex gap-1 rounded-tr-xl rounded-bl-xl">
                <span className="w-1 h-1 bg-anime-secondary animate-bounce"></span>
                <span className="w-1 h-1 bg-anime-secondary animate-bounce" style={{animationDelay: '0.1s'}}></span>
                <span className="w-1 h-1 bg-anime-secondary animate-bounce" style={{animationDelay: '0.2s'}}></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/80 border-t border-white/10 backdrop-blur-md">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 text-sm rounded-none px-4 py-2 focus:outline-none focus:border-anime-secondary/50 focus:bg-white/10 text-gray-200 font-mono placeholder-gray-600"
                placeholder="Transmitting message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500"></div>
          </div>
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isTyping}
            className="p-2 bg-anime-secondary/20 text-anime-secondary border border-anime-secondary/50 hover:bg-anime-secondary hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
             {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="group-hover:scale-110 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
};