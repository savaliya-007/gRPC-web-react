import React, { useState, useEffect, useRef } from 'react';
import { UserIdentity, DirectMessage } from './grpc/chat_pb';
import { ChatServiceClient } from './grpc/chat_grpc_web_pb';

const client = new ChatServiceClient('http://localhost:8080', null, null);

export default function App() {
  const [myId, setMyId] = useState('');
  const [toId, setToId] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = () => {
    if (!myId || !toId) return alert("Please enter both names");

    const req = new UserIdentity();
    req.setUserId(myId);

    try {
      const stream = client.subscribe(req, {});
      stream.on('data', (res) => {
        setMessages(prev => [...prev, { 
          sender: res.getFrom(), 
          text: res.getMessage(), 
          isMe: false 
        }]);
      });
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

  if (!isJoined) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>Messenger</h2>
          <input 
            style={styles.darkInput} 
            placeholder="Your Username" 
            value={myId} 
            onChange={e => setMyId(e.target.value)} 
          />
          <input 
            style={styles.darkInput} 
            placeholder="Chat with..." 
            value={toId} 
            onChange={e => setToId(e.target.value)} 
          />
          <button style={styles.loginBtn} onClick={joinChat}>Start Chat</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <header style={styles.chatHeader}>
        <div style={styles.avatar}>{toId.charAt(0).toUpperCase()}</div>
        <div style={{ marginLeft: '12px' }}>
          <div style={{ fontWeight: 'bold' }}>{toId}</div>
          <div style={{ fontSize: '12px', color: '#00d2ff' }}>online</div>
        </div>
      </header>

      <div style={styles.messageArea}>
        {messages.map((m, i) => (
          <div key={i} style={m.isMe ? styles.myRow : styles.theirRow}>
            <div style={m.isMe ? styles.myBubble : styles.theirBubble}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} style={styles.inputBar}>
        <input 
          style={styles.messageInput} 
          placeholder="Write a message..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
        />
        <button style={styles.sendIconBtn}>➤</button>
      </form>
    </div>
  );
}

const styles = {
  loginPage: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0f172a' },
  loginCard: { width: '320px', padding: '30px', background: '#1e293b', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' },
  darkInput: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', outline: 'none' },
  loginBtn: { width: '100%', padding: '12px', background: '#38bdf8', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  
  appContainer: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f172a', color: '#fff', fontFamily: 'sans-serif' },
  chatHeader: { display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#1e293b', borderBottom: '1px solid #334155' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', background: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  
  messageArea: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' },
  myRow: { display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' },
  theirRow: { display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' },
  
  myBubble: { background: '#3b82f6', color: '#fff', padding: '10px 16px', borderRadius: '18px 18px 0 18px', maxWidth: '75%' },
  theirBubble: { background: '#334155', color: '#fff', padding: '10px 16px', borderRadius: '18px 18px 18px 0', maxWidth: '75%' },
  
  inputBar: { display: 'flex', padding: '15px', background: '#1e293b' },
  messageInput: { flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '16px' },
  sendIconBtn: { background: 'none', border: 'none', color: '#38bdf8', fontSize: '24px', cursor: 'pointer' }
};