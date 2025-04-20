import { useState } from 'react';
import axios from 'axios';

export default function OrderPanel() {
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/orders', {
        productId: 101,
        buyer: 'Jane',
        quantity: 1,
      });
      alert('✅ Order Placed!');
    } catch (err) {
      console.error(err);
      alert('❌ Order Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-1">
      <h2 className="text-xl font-semibold mb-2">🛒 Order Product</h2>
      <button
        onClick={placeOrder}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}
