import React, { useState } from 'react';
import { FaDatabase, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function SeedServices() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const handleCheckServices = async () => {
    setMessage('Checking services...');
    try {
      const response = await fetch('/api/services');
      const services = await response.json();
      setSuccess(true);
      setMessage(`✅ Found ${services.length} services already loaded!`);
    } catch (error) {
      setSuccess(false);
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-12">
          <div className="mb-8 flex justify-center">
            <FaDatabase className="text-6xl text-blue-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Services Loaded</h1>
          <p className="text-gray-600 text-lg mb-8 text-center">
            All garage services are pre-loaded without database
          </p>

          <button
            onClick={handleCheckServices}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 text-lg mb-8"
          >
            ✅ Check Services Status
          </button>

          {message && (
            <div className={`p-6 rounded-lg text-lg font-semibold flex items-center gap-3 ${
              success 
                ? 'bg-green-100 text-green-800' 
                : success === false 
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {success ? (
                <FaCheckCircle className="text-2xl" />
              ) : success === false ? (
                <FaExclamationCircle className="text-2xl" />
              ) : null}
              {message}
            </div>
          )}

          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="font-bold text-gray-900 mb-6 text-2xl">📦 Services Available (53 Total):</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">🛠️ Maintenance & Repairs</h3>
                <ul className="text-gray-700 text-sm space-y-2 ml-4">
                  <li>✓ General Maintenance (6)</li>
                  <li>✓ Engine Repairs (6)</li>
                  <li>✓ Transmission (4)</li>
                  <li>✓ Brake System (4)</li>
                  <li>✓ Suspension (4)</li>
                  <li>✓ Electrical (5)</li>
                  <li>✓ AC & Cooling (4)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎨 Specialized Services</h3>
                <ul className="text-gray-700 text-sm space-y-2 ml-4">
                  <li>✓ Bodywork & Painting (4)</li>
                  <li>✓ Detailing (4)</li>
                  <li>✓ Tyres (4)</li>
                  <li>✓ Advanced Services (4)</li>
                  <li>✓ Accessories (4)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-8">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">💰 Pricing (Indian Market):</h3>
              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700 mb-2"><span className="font-semibold">Budget Services:</span> ₹200 - ₹1,500</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Standard Services:</span> ₹1,500 - ₹10,000</p>
                <p className="text-gray-700"><span className="font-semibold">Premium Services:</span> ₹10,000 - ₹50,000</p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-bold text-gray-900 mb-2">🎯 Features:</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>✓ All services pre-loaded (no database needed)</li>
                <li>✓ Beautiful emoji-based visual representation</li>
                <li>✓ Realistic Indian market pricing</li>
                <li>✓ Service duration and ratings</li>
                <li>✓ WhatsApp integration for inquiries</li>
                <li>✓ Responsive design for mobile and desktop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeedServices;
