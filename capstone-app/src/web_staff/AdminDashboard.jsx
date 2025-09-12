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

  // Navigation state
  const [activeTab, setActiveTab] = useState('inventory');

  // Product management state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(MOCK_PRODUCTS || []);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [paginatedProducts, setPaginatedProducts] = useState([]);
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

  // Sales state
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [salesHistory, setSalesHistory] = useState([]);

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
    setActiveTab('inventory');
    setCart([]);
    setCustomerName('');
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  // Product filtering
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

  // Sales functions
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Product is out of stock!');
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert('Cannot add more items than available in stock!');
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
      alert('Cannot exceed available stock!');
      return;
    }

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.onSale ? item.salePrice : item.originalPrice;
      return total + (price * item.quantity);
    }, 0);
  };

  const processSale = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    if (!customerName.trim()) {
      alert('Please enter customer name!');
      return;
    }

    // Update stock
    const updatedProducts = products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity };
      }
      return product;
    });

    // Create sale record
    const sale = {
      id: `sale_${Date.now()}`,
      customerName,
      items: cart,
      total: getCartTotal(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setProducts(updatedProducts);
    setSalesHistory([sale, ...salesHistory]);
    setCart([]);
    setCustomerName('');
    alert('Sale processed successfully!');
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

          <div className="space-y-4">
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
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">Demo: admin / showideaadmin</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
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
          <h1 className="text-xl font-bold text-gray-800">Show Idéa - Staff Dashboard</h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'sales'
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-purple-50'
            }`}
          >
            History
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600 focus:outline-none px-3 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8" style={{ paddingTop: `${headerHeight + 20}px` }}>
        
        {/* Inventory Management Tab */}
        {activeTab === 'inventory' && (
          <>
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

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <div className="relative w-full sm:w-1/2">
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
                className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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
          </>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Products for Sale */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {products.filter(p => p.isActive && p.stock > 0).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h4 className="font-bold text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                    <p className="text-sm font-bold text-purple-600">
                      ₱{product.onSale ? product.salePrice.toFixed(2) : product.originalPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shopping Cart */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="max-h-64 overflow-y-auto mb-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            ₱{item.onSale ? item.salePrice.toFixed(2) : item.originalPrice.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded text-sm hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded text-sm hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total:</span>
                    <span>₱{getCartTotal().toFixed(2)}</span>
                  </div>
                  <button
                    onClick={processSale}
                    disabled={cart.length === 0 || !customerName.trim()}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Process Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sales History Tab */}
        {activeTab === 'history' && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sales History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {salesHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-12">No sales recorded yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {salesHistory.map((sale) => (
                        <tr key={sale.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {sale.date} {sale.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{sale.customerName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {sale.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-green-600">
                            ₱{sale.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
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

      {/* Simple Staff Footer */}
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        <div>© 2025 Show Idéa - Staff Dashboard. Internal use only.</div>
      </footer>
    </div>
  );
};

export default AdminDashboard;