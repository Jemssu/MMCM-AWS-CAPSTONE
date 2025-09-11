import React from 'react';

const ProductEditModal = ({ isEditModalOpen, closeEditModal, productToEdit, editProductForm, handleEditChange, handleStockChange, saveProduct }) => {
  if (!isEditModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300 opacity-100"
      onClick={closeEditModal}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-4">
          {productToEdit ? "Modify Product" : "Create New Product"}
        </h3>
        <div id="edit-error-message" className="text-red-500 mb-4"></div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={editProductForm.name}
              onChange={handleEditChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              readOnly={!!productToEdit}
            />
            {productToEdit && (
              <p className="text-xs text-gray-500 mt-1">
                *Name cannot be changed for an existing product.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={editProductForm.description}
              onChange={handleEditChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={editProductForm.category}
              onChange={handleEditChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={editProductForm.price}
              onChange={handleEditChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Amount</label>
            <div className="flex items-center mt-1">
              <button
                onClick={() => handleStockChange(-1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                name="stock"
                value={editProductForm.stock}
                onChange={handleEditChange}
                className="flex-1 w-full text-center rounded-none border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                min="0"
              />
              <button
                onClick={() => handleStockChange(1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="sale"
              name="sale"
              checked={editProductForm.sale}
              onChange={handleEditChange}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="sale" className="ml-2 block text-sm text-gray-900">
              On Sale
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={editProductForm.active}
              onChange={handleEditChange}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeEditModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveProduct}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;