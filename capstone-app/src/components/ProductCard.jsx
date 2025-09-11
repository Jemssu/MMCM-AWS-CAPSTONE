import React from "react";

const ProductCard = ({ product, openViewModal, openEditModal }) => {
  const { imageUrl, name, category, price, stock, isActive, onSale } = product;

  // Determine color for price based on 'onSale' status
  const priceColor = onSale ? "text-red-600" : "text-gray-800";

  // Determine color and text for active status
  const statusColor = isActive ? "text-green-600" : "text-red-600";
  const statusText = isActive ? "Active" : "Inactive";

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
      <div className="relative cursor-pointer" onClick={() => openViewModal(product)}>
        {onSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
            On Sale!
          </span>
        )}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover object-center rounded-t-xl"
          onError={(e) =>
            (e.target.src = `https://placehold.co/400x400/94a3b8/ffffff?text=Image+Not+Found`)
          }
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {name}
        </h3>
        <p className="text-sm font-medium text-gray-500 mb-3">
          {category}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">
          Stock: {stock} | Status: <span className={statusColor}>{statusText}</span>
        </p>
        <p className={`mt-3 text-lg font-bold ${priceColor}`}>
          ₱{price.toFixed(2)}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => openEditModal(product)}
            className="flex-1 bg-purple-600 text-white p-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;