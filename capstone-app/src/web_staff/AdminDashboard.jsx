import React, { useState, useEffect, useRef } from "react";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductViewModal from "../components/ProductViewModal.jsx";
import ProductEditModal from "../components/ProductEditModal.jsx";
import Pagination from "../components/Pagination.jsx";

const AdminDashboard = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Product management state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(MOCK_PRODUCTS || []);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  
  // Enhanced filtering with sort options
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const categories = ["All", ...new Set((products || []).map((p) => p.category))];

  // Modal states
  const [productToView, setProductToView] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editProductForm, setEditProductForm] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    onSale: false,
    isActive: true,
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

  // Authentication functions
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Simple authentication (replace with your actual auth logic)
    if (loginForm.username === 'admin' && loginForm.password === 'showideaadmin') {
      setIsAuthenticated(true);
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  // Enhanced product filtering with sorting
  const handleFilterChange = (newSearchTerm, newCategory, newSortBy, newSortOrder, productsToFilter) => {
    let newFilteredProducts = (productsToFilter || []).filter((product) => {
      const matchesSearchTerm =
        product.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(newSearchTerm.toLowerCase()));
      const matchesCategory =
        newCategory === "All" || product.category === newCategory;
      return matchesSearchTerm && matchesCategory;
    });

    // Apply sorting
    newFilteredProducts.sort((a, b) => {
      let aValue = a[newSortBy];
      let bValue = b[newSortBy];
      
      if (newSortBy === 'originalPrice' || newSortBy === 'stock') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (newSortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterChange(searchTerm, selectedCategory, sortBy, sortOrder, products);
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Product management functions
  const handlePageChange = (page) => setCurrentPage(page);
  const clearSearch = () => setSearchTerm("");
  const openViewModal = (product) => setProductToView(product);
  const closeViewModal = () => setProductToView(null);

  const openEditModal = (product = null) => {
    setProductToEdit(product);
    if (product) {
      setEditProductForm({
        name: product.name,
        description: product.description,
        originalPrice: product.originalPrice,
        salePrice: product.salePrice || 0,
        onSale: product.onSale || false,
        isActive: product.isActive !== false,
        stock: product.stock,
        category: product.category,
      });
    } else {
      setEditProductForm({
        name: "",
        description: "",
        originalPrice: 0,
        salePrice: 0,
        onSale: false,
        isActive: true,
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
    if (!editProductForm.name || !editProductForm.originalPrice || !editProductForm.category || !editProductForm.description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (productToEdit) {
      const updatedProducts = products.map(p =>
        p.id === productToEdit.id ? { ...p, ...editProductForm } : p
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: `prod_${Date.now()}`,
        imageUrl: `https://placehold.co/400x400/94a3b8/ffffff?text=${editProductForm.name}`,
        ...editProductForm,
      };
      setProducts([...products, newProduct]);
    }
    closeEditModal();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 max-w-sm mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              S
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Show Idéa</h2>
            <p className="text-gray-600 mt-2">Staff Dashboard Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center">{loginError}</div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">Demo: admin / showideaadmin</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard - Inventory Management Only
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header
        ref={headerRef}
        className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-20"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <h1 className="text-xl font-bold text-gray-800">Show Idéa - Inventory Management</h1>
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600 focus:outline-none px-3 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 mt-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Inventory Management
        </h2>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Manage your products, prices, and stock status.
        </p>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={() => openEditModal()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors transform hover:scale-105"
          >
            + Create New Product
          </button>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-8">
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
          <select
            className="w-full lg:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="w-full lg:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="originalPrice">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
            <option value="category">Sort by Category</option>
          </select>
          <select
            className="w-full lg:w-1/6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z / Low-High</option>
            <option value="desc">Z-A / High-Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {paginatedProducts && paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                openViewModal={openViewModal}
                openEditModal={openEditModal}
                isStaffView={true}
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

      {/* Modals */}
      <ProductViewModal
        productToView={productToView}
        closeViewModal={closeViewModal}
        openEditModal={openEditModal}
        isStaffView={true}
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
    </div>
  );
};

export default AdminDashboard;