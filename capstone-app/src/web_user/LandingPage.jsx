import React, { useState, useEffect, useRef } from "react";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";
import ProductViewModal from "../components/ProductViewModal.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("home");
  const productsPerPage = 8;
  const activeProducts = (MOCK_PRODUCTS || []).filter(product => product.isActive);
  const [filteredProducts, setFilteredProducts] = useState(activeProducts);
  const categories = ["All", "Sale", ...new Set(activeProducts.map((p) => p.category))];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleFilterChange = (newSearchTerm, newCategory) => {
    let newFilteredProducts = activeProducts.filter((product) => {
      const matchesSearchTerm =
        product.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(newSearchTerm.toLowerCase());
      const matchesCategory =
        newCategory === "All" || (newCategory === "Sale" && product.onSale) || product.category === newCategory;
      return matchesSearchTerm && matchesCategory;
    });
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    handleFilterChange("", selectedCategory);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const scrollToSection = (sectionRef, sectionName) => {
    setActiveSection(sectionName);
    if (sectionRef.current) {
      const yOffset = -headerHeight - 20;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Header */}
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
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection(homeRef, 'home')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'home' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef, 'about')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'about' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection(productsRef, 'products')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'products' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection(contactRef, 'contact')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'contact' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-700 hover:text-purple-600'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-600 hover:text-purple-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white min-h-screen flex items-center"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="text-yellow-300">Your Store</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Discover amazing products that will transform your life. Quality, innovation, and excellence in every item we offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection(productsRef, 'products')}
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Shop Now
              </button>
              <button
                onClick={() => scrollToSection(aboutRef, 'about')}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about bringing you the finest products with exceptional quality and service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
              <p className="text-lg text-gray-700 mb-6">
                Founded with a vision to provide exceptional products and outstanding customer service, 
                we've been serving our community with dedication and passion. Our commitment to quality 
                and innovation drives everything we do.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                From humble beginnings to becoming a trusted name in the industry, we continue to grow 
                while maintaining our core values of integrity, excellence, and customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Quality Products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Fast Shipping</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">99%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600">
              Browse our collection of amazing products.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange(e.target.value, selectedCategory);
                }}
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

          {/* Products Grid */}
          {filteredProducts && filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105 cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    <div className="relative">
                      {product.onSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
                          On Sale!
                        </span>
                      )}
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover object-center rounded-t-xl"
                        onError={(e) =>
                          (e.target.src = `https://placehold.co/400x400/94a3b8/ffffff?text=Image+Not+Found`)
                        }
                      />
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
                      <p className="mt-3 text-lg font-bold">
                        {product.onSale ? (
                          <>
                            <span className="text-gray-400 line-through mr-2">₱{product.originalPrice.toFixed(2)}</span>
                            <span className="text-red-600">₱{product.salePrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-gray-800">₱{product.originalPrice.toFixed(2)}</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex justify-center mt-8 space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`px-4 py-2 rounded-lg shadow transition-colors ${
                        currentPage === i + 1
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-gray-700 bg-white rounded-lg shadow hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center text-xl text-gray-500 mt-10">
              No products found. Try a different search! 🔎
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 text-purple-600 mr-4 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@yourcompany.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 text-purple-600 mr-4 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">+63 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 text-purple-600 mr-4 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600">Butuan City, Caraga, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Thank you for your message! We will get back to you soon.');
                  }}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product View Modal */}
      <ProductViewModal
        productToView={selectedProduct}
        closeViewModal={closeProductModal}
        isStaffView={false}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;