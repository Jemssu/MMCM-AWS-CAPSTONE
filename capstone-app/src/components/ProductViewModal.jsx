import React from "react";

const ProductViewModal = ({ productToView, closeViewModal }) => {
  if (!productToView) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4 z-50"
      onClick={closeViewModal}
    >
      <div
        className="relative p-6 bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Product Image */}
          <div className="sm:w-1/2">
            <img
              src={productToView?.imageUrl}
              alt={productToView?.name}
              className="w-full rounded-lg object-cover h-64 sm:h-auto"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/400x400/94a3b8/ffffff?text=Image+Not+Found";
              }}
            />
          </div>

          {/* Product Details */}
          <div className="sm:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {productToView?.name}
            </h3>
            <p className="text-lg font-semibold text-purple-600 mb-4">
              ₱{productToView?.price?.toFixed(2)}
              {productToView?.onSale && (
                <span className="ml-3 text-sm font-normal text-red-500">
                  On Sale!
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Category: {productToView?.category}
            </p>
            <p className="text-gray-700 text-base mb-6">
              {productToView?.description}
            </p>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="flex justify-end mt-6">
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
