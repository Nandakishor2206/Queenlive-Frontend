import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function NotificationPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on('new-order', (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-1">
      <h2 className="text-xl font-semibold mb-2">🔔 Order Notifications</h2>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {orders.map((order, idx) => (
          <div key={idx} className="text-sm text-gray-800 border-b pb-1">
            <strong>{order.buyer}</strong> ordered product #{order.productId} (Qty: {order.quantity})
          </div>
        ))}
      </div>
    </div>
  );
}
