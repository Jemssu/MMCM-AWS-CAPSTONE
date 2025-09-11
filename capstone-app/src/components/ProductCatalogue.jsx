import React, { useState, useEffect, useRef } from "react";
// Import mock data to be used until the backend is integrated
import { MOCK_PRODUCTS } from "../data/mockProducts.js";

/**
 * ProductCatalogue Component
 * Displays a list of products with search and category filtering.
 * This component is built to be easily transitioned from mock data to a live AWS backend.
 */
const ProductCatalogue = () => {
  // State for search term and selected category
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State to hold the products that will be displayed after filtering.
  // Use a fallback empty array to prevent errors if MOCK_PRODUCTS is undefined.
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS || []);

  // Get all unique categories from the mock data to populate the dropdown.
  // Use a fallback empty array to prevent the `map` error if MOCK_PRODUCTS is undefined.
  const categories = ["All", ...new Set((MOCK_PRODUCTS || []).map((p) => p.category))];

  // State for the image modal
  const [selectedImage, setSelectedImage] = useState(null);

  // State for the staff login modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref to measure the header's height
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // useEffect to dynamically measure the header height
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  /**
   * This is a placeholder for future AWS data fetching.
   */
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const productData = await API.graphql(graphqlOperation(listProducts));
  //       const productList = productData.data.listProducts.items;
  //       setFilteredProducts(productList);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  /**
   * Handles changes to the search term and category filter.
   */
  const handleFilterChange = (newSearchTerm, newCategory) => {
    let newFilteredProducts = (MOCK_PRODUCTS || []).filter((product) => {
      // Check if the product's name or description includes the search term
      const matchesSearchTerm =
        product.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(newSearchTerm.toLowerCase());

      // Check if the product's category matches the selected category, or if 'All' is selected
      const matchesCategory =
        newCategory === "All" || product.category === newCategory;

      return matchesSearchTerm && matchesCategory;
    });
    setFilteredProducts(newFilteredProducts);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header
        ref={headerRef}
        className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10"
      >
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-3">
          {/* Replace with your logo */}
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            L
          </div>
          <h1 className="text-xl font-bold text-gray-800">Your Company Name</h1>
        </div>

        {/* Navigation Menu Button */}
        <button
          onClick={() => setIsModalOpen(true)}
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

      {/* Main Content */}
      <div
        className="container mx-auto p-4 sm:p-6 lg:p-8"
        style={{ paddingTop: `${headerHeight + 20}px` }}
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Product Catalogue
        </h2>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Browse our collection of products.
        </p>

        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange(e.target.value, selectedCategory);
            }}
          />
          <select
            className="w-full sm:w-1/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleFilterChange(searchTerm, e.target.value);
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional rendering to prevent the 'map' error */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center rounded-t-xl cursor-pointer"
                    onClick={() => openModal(product.imageUrl)}
                    onError={(e) =>
                      (e.target.src = `https://placehold.co/400x400/94a3b8/ffffff?text=Image+Not+Found`)
                    }
                  />
                  <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    ₱{product.price.toFixed(2)}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mb-3">
                    {product.category}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-500 mt-10">
            No products found. Try a different search! 🔎
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4 z-50"
            onClick={closeModal}
          >
            <div
              className="relative p-6 bg-white rounded-xl shadow-2xl max-w-lg w-full transform scale-100 transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-white bg-red-600 rounded-full w-8 h-8 flex justify-center items-center hover:bg-red-700 transition-colors"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
              <img
                src={selectedImage}
                alt="Enlarged"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Staff Login Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h3 className="text-2xl font-bold mb-4">Staff Login</h3>
              <p className="mb-6 text-gray-600">
                This is a placeholder for your staff login page. You will implement a secure login form and redirection to the staff dashboard here.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;