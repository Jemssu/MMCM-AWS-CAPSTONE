import React, { useState, useEffect, useRef } from "react";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductViewModal from "../components/ProductViewModal.jsx";
import ProductEditModal from "../components/ProductEditModal.jsx";
import Pagination from "../components/Pagination.jsx";

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(MOCK_PRODUCTS || []);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const categories = ["All", ...new Set((products || []).map((p) => p.category))];
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [productToView, setProductToView] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editProductForm, setEditProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    sale: false,
    active: true,
    stock: 0,
    category: "",
  });

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleFilterChange = (newSearchTerm, newCategory, productsToFilter) => {
    let newFilteredProducts = (productsToFilter || []).filter((product) => {
      const matchesSearchTerm =
        product.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(newSearchTerm.toLowerCase()));
      const matchesCategory =
        newCategory === "All" || product.category === newCategory;
      return matchesSearchTerm && matchesCategory;
    });
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterChange(searchTerm, selectedCategory, products);
  }, [products, searchTerm, selectedCategory]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const openViewModal = (product) => {
    setProductToView(product);
  };

  const closeViewModal = () => {
    setProductToView(null);
  };

  const openEditModal = (product = null) => {
    setProductToEdit(product);
    if (product) {
      setEditProductForm({
        name: product.name,
        description: product.description,
        price: product.price,
        sale: product.onSale || false,
        active: product.isActive !== false,
        stock: product.stock,
        category: product.category,
      });
    } else {
      setEditProductForm({
        name: "",
        description: "",
        price: 0,
        sale: false,
        active: true,
        stock: 0,
        category: "",
      });
    }
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProductForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStockChange = (amount) => {
    setEditProductForm(prev => ({
      ...prev,
      stock: Math.max(0, parseInt(prev.stock) + amount),
    }));
  };

  const saveProduct = () => {
    if (!editProductForm.name || !editProductForm.price || !editProductForm.category || !editProductForm.description) {
      document.getElementById('edit-error-message').innerText = "Please fill in all required fields.";
      return;
    }
    document.getElementById('edit-error-message').innerText = "";

    if (productToEdit) {
      const updatedProducts = products.map(p =>
        p.id === productToEdit.id ? { ...p, ...editProductForm, onSale: editProductForm.sale, isActive: editProductForm.active } : p
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: `prod_${products.length + 1}`,
        imageUrl: `https://placehold.co/400x400/94a3b8/ffffff?text=${editProductForm.name}`,
        ...editProductForm,
        onSale: editProductForm.sale,
        isActive: editProductForm.active,
      };
      setProducts([...products, newProduct]);
    }
    closeEditModal();
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header
        ref={headerRef}
        className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-20"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <h1 className="text-xl font-bold text-gray-800">Your Company Name</h1>
        </div>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="text-gray-600 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </header>
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8" style={{ paddingTop: `${headerHeight + 20}px` }}>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Inventory Management
        </h2>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Manage your products, prices, and stock status.
        </p>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => openEditModal()}
            className="bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors transform hover:scale-105"
          >
            Create New Product
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            )}
          </div>
          <select
            className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {paginatedProducts && paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                openViewModal={openViewModal}
                openEditModal={openEditModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-500 mt-10">
            No products found. Try a different search! 🔎
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300 opacity-100">
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Staff Login</h3>
            <p className="mb-6 text-gray-600">
              This is a placeholder for your staff login page. You will implement a secure login form and redirection to the staff dashboard here.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ProductViewModal
        productToView={productToView}
        closeViewModal={closeViewModal}
        openEditModal={openEditModal}
      />

      <ProductEditModal
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        productToEdit={productToEdit}
        editProductForm={editProductForm}
        handleEditChange={handleEditChange}
        handleStockChange={handleStockChange}
        saveProduct={saveProduct}
      />

      <footer className="bg-white shadow-inner mt-8 py-8 text-center text-gray-500 text-sm flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-8 h-8 text-gray-400 hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.908c0-.853.183-1.428 1.429-1.428h2.071v-4h-3.29c-3.415 0-4.71 2.37-4.71 4.296v2.104z"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-8 h-8 text-gray-400 hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.672 1.624 4.816 4.85.058 1.267.069 1.647.069 4.85s-.012 3.584-.069 4.85c-.144 3.227-1.564 4.654-4.816 4.85-.058.028-1.267.069-4.85.069s-3.584-.012-4.85-.069c-3.252-.144-4.672-1.564-4.816-4.816-.058-1.267-.069-1.647-.069-4.85s.012-3.584.069-4.85c.144-3.252 1.564-4.672 4.816-4.816 1.267-.058 1.647-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.203-6.162 2.115-6.364 6.364-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.202 4.249 2.115 6.052 6.364 6.364 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.249-.202 6.052-2.115 6.364-6.364.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.202-4.249-2.115-6.052-6.364-6.364-1.28-.058-1.688-.072-4.947-.072zM12 7.294c-2.894 0-5.241 2.347-5.241 5.241s2.347 5.241 5.241 5.241 5.241-2.347 5.241-5.241-2.347-5.241-5.241-5.241zm0 8.294c-1.689 0-3.053-1.364-3.053-3.053s1.364-3.053 3.053-3.053 3.053 1.364 3.053 3.053-1.364 3.053-3.053 3.053zm6.381-11.309c-.895 0-1.621.726-1.621 1.621s.726 1.621 1.621 1.621 1.621-.726 1.621-1.621-.726-1.621-1.621-1.621z"></path>
            </svg>
          </a>
          <a href="https://shopee.ph" target="_blank" rel="noopener noreferrer" aria-label="Shopee">
            <svg className="w-8 h-8 text-gray-400 hover:text-orange-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.398 12.001c0-2.306-1.892-4.175-4.244-4.175s-4.244 1.869-4.244 4.175c0 1.948 1.353 3.585 3.197 4.075v-.895c-.961-.482-1.622-1.488-1.622-2.316 0-1.378 1.12-2.5 2.5-2.5s2.5 1.122 2.5 2.5c0 .828-.661 1.834-1.622 2.316v.895c1.844-.49 3.197-2.127 3.197-4.075z"></path>
            </svg>
          </a>
          <a href="https://www.lazada.com.ph" target="_blank" rel="noopener noreferrer" aria-label="Lazada">
            <svg className="w-8 h-8 text-gray-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.001 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.178 15.688c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm.001-4.062c-1.122 0-2.034-.912-2.034-2.034s.912-2.034 2.034-2.034 2.034.912 2.034 2.034-.912 2.034-2.034 2.034zm-3.25 4.062c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm.001-4.062c-1.122 0-2.034-.912-2.034-2.034s.912-2.034 2.034-2.034 2.034.912 2.034 2.034-.912 2.034-2.034 2.034z"></path>
            </svg>
          </a>
        </div>
        <div>
          © 2025 Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default InventoryManagement;