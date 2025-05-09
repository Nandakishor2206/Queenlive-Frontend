import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL); // Use the environment variable here

export default function Home() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`) // Use the environment variable
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Product fetch error:', err));
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to backend');
    });

    socket.on('chat-message', (msg) => {
      setMessages(prev => [...prev, msg.text]);
      setNotifications(prev => [...prev, `💬 New message: ${msg.text}`]);
    });

    socket.on('order-placed', (order) => {
      setNotifications(prev => [...prev, `🛒 New Order: ${order.productName}`]);
    });

    return () => {
      socket.off('chat-message');
      socket.off('order-placed');
    };
  }, []);

  const sendMessage = () => {
    if (chatInput.trim() !== '') {
      socket.emit('chat-message', { text: chatInput });
      setChatInput('');
    }
  };

  const placeOrder = () => {
    const sampleOrder = { productName: 'T-shirt', quantity: 1 };
    socket.emit('place-order', sampleOrder);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">🛍️ QueenLive Live Commerce Room</h1>

      {/* Chat */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">💬 Chat</h2>
        <div className="mb-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type message..."
            className="border rounded p-2 w-full"
          />
        </div>
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
        <ul className="mt-4">
          {messages.map((msg, idx) => (
            <li key={idx} className="text-gray-800">👉 {msg}</li>
          ))}
        </ul>
      </div>

      {/* Order Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">🛒 Order Product</h2>
        <ul className="mb-2">
          {products.map(prod => (
            <li key={prod.id} className="text-gray-800">
              {prod.name} - ₹{prod.price}
            </li>
          ))}
        </ul>
        <button onClick={placeOrder} className="bg-green-600 text-white px-4 py-2 rounded">
          Place Order
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">🔔 Order Notifications</h2>
        <ul>
          {notifications.map((note, idx) => (
            <li key={idx} className="text-gray-700">📢 {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
