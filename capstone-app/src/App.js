import React, { useState } from 'react';
import ProductCatalogue from './web_user/ProductCatalogue.jsx';
import InventoryManagement from './web_staff/InventoryManagement.jsx';

function App() {
  const [isStaff, setIsStaff] = useState(false); // Set to true to start on the staff view

  const toggleView = () => {
    setIsStaff(!isStaff);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 left-4 z-50 ">
        <button
          onClick={toggleView}
          className="bg-purple-600 text-white p-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          {isStaff ? "Switch to User View" : "Switch to Staff View"}
        </button>
      </div>

      {isStaff ? <InventoryManagement /> : <ProductCatalogue />}
    </div>
  );
}

export default App;