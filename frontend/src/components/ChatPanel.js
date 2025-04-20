import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function ChatPanel() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat-message', message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-1">
      <h2 className="text-xl font-semibold mb-2">💬 Chat</h2>
      <div className="h-48 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm text-gray-800">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border px-2 py-1 flex-1 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
