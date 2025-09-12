import React from 'react';

const ProductViewModal = ({ productToView, closeViewModal, openEditModal, isStaffView }) => {
  if (!productToView) return null;

  // Destructure the correct properties from the productToView object
  const { imageUrl, name, category, description, originalPrice, salePrice, stock, isActive, onSale } = productToView;

  const handleEditClick = (e) => {
    e.stopPropagation();
    closeViewModal();
    openEditModal(productToView);
  };

  const statusColor = isActive ? "text-green-600" : "text-red-600";
  const statusText = isActive ? "Active" : "Inactive";
  const stockColor = stock <= 10 ? "text-red-600 font-bold" : "text-gray-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300 opacity-100"
      onClick={closeViewModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div className="w-1/2 pr-4">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto rounded-lg shadow-md mb-4"
              onError={(e) => e.target.src = `https://placehold.co/400x400/94a3b8/ffffff?text=Image+Not+Found`}
            />
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {name}
            </h3>
            <p className="text-md font-medium text-gray-500 mb-2">
              {category}
            </p>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {description}
            </p>
            {/* Conditional rendering for prices based on 'onSale' status */}
            {onSale ? (
              <p className="text-xl font-bold mb-2">
                <span className="text-gray-400 line-through mr-2">₱{originalPrice.toFixed(2)}</span>
                <span className="text-red-600">₱{salePrice.toFixed(2)}</span>
              </p>
            ) : (
              <p className="text-xl font-bold text-gray-800 mb-2">
                ₱{originalPrice.toFixed(2)}
              </p>
            )}
            {isStaffView && (
              <div className="text-sm text-gray-700 mb-4">
                <p>Stock: <span className={stockColor}>{stock}</span></p>
                <p>Status: <span className={statusColor}>{statusText}</span></p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          {isStaffView && (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition-colors"
            >
              Edit Product
            </button>
          )}
          <button
            onClick={closeViewModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;