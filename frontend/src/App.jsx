import React, { useState, useEffect, useRef } from 'react';
import { UserIdentity, DirectMessage } from './grpc/chat_pb';
import { ChatServiceClient } from './grpc/chat_grpc_web_pb';
import './index.css';

const client = new ChatServiceClient('http://localhost:8080', null, null);

export default function App() {
  const [myId, setMyId] = useState('');
  const [toId, setToId] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = (mode) => {
    const target = mode === 'group' ? 'GROUP_GLOBAL' : toId;
    if (!myId || !target) return alert("Please fill in all fields");

    const req = new UserIdentity();
    req.setUserId(myId);

    try {
      const stream = client.subscribe(req, {});
      stream.on('data', (res) => {
        setMessages(prev => [...prev, { 
          sender: res.getFrom(), 
          text: res.getMessage(), 
          isMe: false,
          isGroupMsg: mode === 'group'
        }]);
      });
      setIsGroup(mode === 'group');
      if (mode === 'group') setToId('GROUP_GLOBAL');
      setIsJoined(true);
    } catch (e) {
      console.error("Connection Error:", e);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input) return;

    const req = new DirectMessage();
    req.setFrom(myId);
    req.setTo(toId);
    req.setMessage(input);

    client.sendMessage(req, {}, (err) => {
      if (!err) {
        setMessages(prev => [...prev, { sender: myId, text: input, isMe: true }]);
        setInput('');
      }
    });
  };

  // --- LOGIN SCREEN ---
  if (!isJoined) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f172a] font-sans">
        <div className="w-80 rounded-2xl bg-[#1e293b] p-8 text-center shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-white">Messenger</h2>
          <input 
            className="mb-4 w-full rounded-lg border border-slate-700 bg-[#0f172a] p-2 text-white outline-none focus:border-sky-500" 
            placeholder="Your Name" 
            value={myId} 
            onChange={e => setMyId(e.target.value)} 
          />
          
          <div className="mb-4 space-y-3">
            <input 
              className="w-full rounded-lg border border-slate-700 bg-[#0f172a] p-2 text-white outline-none focus:border-sky-500 disabled:opacity-50" 
              placeholder="Chat with..." 
              value={isGroup ? "" : toId} 
              disabled={isGroup}
              onChange={e => {setToId(e.target.value); setIsGroup(false);}} 
            />
            <button 
              className="w-full rounded-lg bg-sky-500 p-2 font-bold text-white transition-all hover:bg-sky-600" 
              onClick={() => joinChat('private')}
            >
              Start Private Chat
            </button>
          </div>

          <div className="relative my-6 border-t border-slate-700">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e293b] px-2 text-xs text-slate-500">OR</span>
          </div>

          <button 
            className="w-full rounded-lg bg-purple-600 p-2 font-bold text-white transition-all hover:bg-purple-700" 
            onClick={() => joinChat('group')}
          >
            Start Group Chat
        </button>
        </div>
      </div>
    );
  }

  // --- CHAT SCREEN ---
  return (
    <div className="flex h-screen flex-col bg-[#0f172a] font-sans text-white">
      <header className={`flex items-center border-b border-slate-700 p-4 ${isGroup ? 'bg-purple-900/20' : 'bg-[#1e293b]'}`}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold shadow-lg ${isGroup ? 'bg-purple-600' : 'bg-sky-500'}`}>
          {isGroup ? "G" : toId.charAt(0).toUpperCase()}
        </div>
        <div className="ml-3">
          <div className="font-bold">{isGroup ? "Global Community" : toId}</div>
          <div className="text-xs text-sky-400">online</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2 shadow-md ${
              m.isMe 
                ? (isGroup ? 'rounded-l-2xl rounded-tr-2xl bg-purple-600' : 'rounded-l-2xl rounded-tr-2xl bg-blue-600') 
                : 'rounded-r-2xl rounded-tl-2xl bg-slate-800'
            }`}>
              {!m.isMe && isGroup && (
                <div className="mb-1 text-[10px] font-bold text-sky-400">{m.sender}</div>
              )}
              <div className="text-sm">{m.text}</div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 bg-[#1e293b] p-4">
        <input 
          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500" 
          placeholder="Write a message..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
        />
        <button className={`text-2xl transition-transform hover:scale-110 ${isGroup ? 'text-purple-400' : 'text-sky-400'}`}>
          ➤
        </button>
      </form>
    </div>
  );
}