import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StockInput() {
  const [formData, setFormData] = useState({
    type: 'incoming',
    size: '6KG',
    quantity: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity < 1) {
      setError('Quantity must be a positive number');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/stock', {
        ...formData,
        quantity,
      });
      alert('Stock movement recorded!');
      setFormData({ ...formData, quantity: '' });
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Error recording stock movement');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Record Stock Movement</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
            <option value="sale">Sale</option>
            <option value="return">Return</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="6KG">6KG</option>
            <option value="13KG">13KG</option>
            <option value="35KG">35KG</option>
            <option value="50KG">50KG</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Record
        </button>
      </form>
      <Link to="/dashboard" className="block text-center mt-4 text-blue-500 hover:underline">
        View Dashboard
      </Link>
    </div>
  );
}

export default StockInput;