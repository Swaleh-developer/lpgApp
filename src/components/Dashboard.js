import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, historyRes] = await Promise.all([
          axios.get('http://localhost:5000/api/stock/summary'),
          axios.get('http://localhost:5000/api/stock'),
        ]);

        const summaryData = Object.keys(summaryRes.data).map(size => ({
          size,
          ...summaryRes.data[size],
        }));
        setSummary(summaryData);
        setHistory(historyRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Real-Time Stock Dashboard</h2>
      {summary ? (
        <>
          <BarChart width={600} height={300} data={summary} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="size" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="incoming" fill="#8884d8" />
            <Bar dataKey="outgoing" fill="#82ca9d" />
            <Bar dataKey="sale" fill="#ffc658" />
            <Bar dataKey="return" fill="#ff7300" />
            <Bar dataKey="current" fill="#00C4B4" />
          </BarChart>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {summary.map(item => (
              <div key={item.size} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold">{item.size}</h3>
                <p>Incoming: {item.incoming}</p>
                <p>Outgoing: {item.outgoing}</p>
                <p>Sales: {item.sale}</p>
                <p>Returns: {item.return}</p>
                <p>Current Stock: {item.current}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-bold mt-6">Stock History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 rounded-lg mt-2">
              <thead>
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Size</th>
                  <th className="p-2 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{new Date(item.date).toLocaleString()}</td>
                    <td className="p-2">{item.type}</td>
                    <td className="p-2">{item.size}</td>
                    <td className="p-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/" className="block text-center mt-4 text-blue-500 hover:underline">
        Back to Stock Input
      </Link>
    </div>
  );
}

export default Dashboard;