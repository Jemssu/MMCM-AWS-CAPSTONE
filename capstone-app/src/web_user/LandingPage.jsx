import React, { useState, useEffect, useRef } from "react"; 
import { PRODUCT_LIST } from "../data/productList.js";

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#4b2e2b] shadow-inner mt-8 py-8 text-center text-[#f5f5dc] text-sm flex flex-col items-center">
      <div className="flex space-x-6 mb-4">
        <a href="https://www.facebook.com/profile.php?id=61567961128463&rdid=8H0XOuiIWTPdXH93&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Hoh4hagfe#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg className="w-8 h-8 text-[#f5f5dc] hover:text-[#d2b48c] transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.908c0-.853.183-1.428 1.429-1.428h2.071v-4h-3.29c-3.415 0-4.71 2.37-4.71 4.296v2.104z"></path>
          </svg>
        </a>
        <a href="https://www.instagram.com/showidea.dvo?igsh=emhnbDJyOW1jbnR3" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="w-8 h-8 text-[#f5f5dc] hover:text-[#d2b48c] transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.672 1.624 4.816 4.85.058 1.267.069 1.647.069 4.85s-.012 3.584-.069 4.85c-.144 3.227-1.564 4.654-4.816 4.85-.058.028-1.267.069-4.85.069s-3.584-.012-4.85-.069c-3.252-.144-4.672-1.564-4.816-4.816-.058-1.267-.069-1.647-.069-4.85s.012-3.584.069-4.85c.144-3.252 1.564-4.672 4.816-4.816 1.267-.058 1.647-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.203-6.162 2.115-6.364 6.364-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.202 4.249 2.115 6.052 6.364 6.364 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.249-.202 6.052-2.115 6.364-6.364.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.202-4.249-2.115-6.052-6.364-6.364-1.28-.058-1.688-.072-4.947-.072zM12 7.294c-2.894 0-5.241 2.347-5.241 5.241s2.347 5.241 5.241 5.241 5.241-2.347 5.241-5.241-2.347-5.241-5.241-5.241zm0 8.294c-1.689 0-3.053-1.364-3.053-3.053s1.364-3.053 3.053-3.053 3.053 1.364 3.053 3.053-1.364 3.053-3.053 3.053zm6.381-11.309c-.895 0-1.621.726-1.621 1.621s.726 1.621 1.621 1.621 1.621-.726 1.621-1.621-.726-1.621-1.621-1.621z"></path>
          </svg>
        </a>
        <a href="https://ph.shp.ee/pWT8W45" target="_blank" rel="noopener noreferrer" aria-label="Shopee">
          <svg className="w-8 h-8 text-[#f5f5dc] hover:text-orange-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.59 122.88" fill="currentColor">
            <path d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"/>
          </svg>
        </a>
      </div>
      <div>
        © 2025 Show Idéa. All rights reserved.
      </div>
    </footer>
  );
};

function PhotoSlider() {
  const images = [
    "https://cdn.discordapp.com/attachments/1416781049605914704/1417494241747140608/SnapInsta.to_466484450_542463788572211_2252057548062968539_n.jpg?ex=68caafe3&is=68c95e63&hm=0d573340266acb5986772fdc3a749a75cb3c9b00e014db3a8b34513ef973bd17&",
    "https://cdn.discordapp.com/attachments/1416781049605914704/1417494256159035462/SnapInsta.to_466490430_570475658851457_6668399993285489413_n.jpg?ex=68caafe6&is=68c95e66&hm=89dd346617568c282e56361a7d5ca96037ea529fa71dc324cbf9363d627150fd&",
    "https://cdn.discordapp.com/attachments/1416781049605914704/1417494271585550486/SnapInsta.to_466452505_1456305195051671_8460787894809979319_n.jpg?ex=68caafea&is=68c95e6a&hm=ce30db41c32ce3357c1b5ab3e3ae25ef8857ad896f624532670926427fc1070f&",
  ];
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ width: `${100 / images.length}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Product modal component
const ProductViewModal = ({ product, onClose, onVariantChange, variants }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f5f5dc] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#7a5c58] hover:text-[#4b2e2b] z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                {product.onSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    ON SALE
                  </span>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#4b2e2b] mb-2">{product.name}</h3>
                <p className="text-sm font-medium text-[#7a5c58] mb-4">{product.category}</p>
                
                {variants && variants.length > 1 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#4b2e2b] mb-2">Variant:</label>
                    <select
                      value={product.variant}
                      onChange={(e) => onVariantChange(e.target.value)}
                      className="w-full p-2 border border-[#d2b48c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]"
                    >
                      {variants.map((variant) => (
                        <option key={variant.id} value={variant.variant}>
                          {variant.variant}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <p className="text-[#4b2e2b] mb-6">{product.description}</p>
                
                <div className="mb-6">
                  {product.onSale ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 line-through text-lg">₱{product.originalPrice.toFixed(2)}</span>
                      <span className="text-red-600 text-2xl font-bold">₱{product.salePrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-[#4b2e2b]">₱{product.originalPrice.toFixed(2)}</span>
                  )}
                  {!product.isActive && (
                    <p className="text-red-500 font-semibold mt-2">SOLD OUT</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  
  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productsPerPage] = useState(4); // Adjust this number as needed
  
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Group products by base ID (everything before the last dash)
  const groupProductsByBase = () => {
    const groups = {};
    
    PRODUCT_LIST.forEach(product => {
      const baseId = product.id.substring(0, product.id.lastIndexOf('-'));
      if (!groups[baseId]) {
        groups[baseId] = [];
      }
      groups[baseId].push(product);
    });
    
    return Object.values(groups).map(group => {
      // Sort by ID and return the first product as the display product
      const sortedGroup = group.sort((a, b) => a.id.localeCompare(b.id));
      const displayProduct = sortedGroup[0];
      
      return {
        displayProduct,
        variants: sortedGroup,
        hasVariants: sortedGroup.length > 1
      };
    });
  };

  const productGroups = groupProductsByBase();

  // Get unique categories for filter
  const categories = ["All", ...new Set(PRODUCT_LIST.map(product => product.category))];

  // Filter products by category
  const filteredProductGroups = selectedCategory === "All" 
    ? productGroups 
    : productGroups.filter(group => group.displayProduct.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProductGroups.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProductGroups.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    // Optionally scroll to products section
    if (productsRef.current) {
      const yOffset = -headerHeight - 20;
      const y = productsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionRef, sectionName) => {
    setActiveSection(sectionName);
    if (sectionRef.current) {
      const yOffset = -headerHeight - 20;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openProductModal = (productGroup) => {
    const currentVariant = selectedVariants[productGroup.displayProduct.id.substring(0, productGroup.displayProduct.id.lastIndexOf('-'))] || productGroup.displayProduct.variant;
    const selectedProduct = productGroup.variants.find(v => v.variant === currentVariant) || productGroup.displayProduct;
    setSelectedProduct(selectedProduct);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleVariantChange = (newVariant) => {
    if (selectedProduct) {
      const baseId = selectedProduct.id.substring(0, selectedProduct.id.lastIndexOf('-'));
      const productGroup = productGroups.find(group => 
        group.displayProduct.id.substring(0, group.displayProduct.id.lastIndexOf('-')) === baseId
      );
      
      if (productGroup) {
        const newProduct = productGroup.variants.find(v => v.variant === newVariant);
        if (newProduct) {
          setSelectedProduct(newProduct);
          setSelectedVariants(prev => ({
            ...prev,
            [baseId]: newVariant
          }));
        }
      }
    }
  };

  const getDisplayProduct = (productGroup) => {
    const baseId = productGroup.displayProduct.id.substring(0, productGroup.displayProduct.id.lastIndexOf('-'));
    const currentVariant = selectedVariants[baseId] || productGroup.displayProduct.variant;
    return productGroup.variants.find(v => v.variant === currentVariant) || productGroup.displayProduct;
  };

  const shouldShowSoldOut = (productGroup) => {
    if (productGroup.hasVariants) {
      // For products with variants, show SOLD OUT only if ALL variants are inactive/out of stock
      return productGroup.variants.every(variant => !variant.isActive || variant.stock === 0);
    } else {
      // For single products, show SOLD OUT if the product is inactive or has no stock
      return !productGroup.displayProduct.isActive || productGroup.displayProduct.stock === 0;
    }
  };

  return (
    <div className="bg-[#f5f5dc] min-h-screen">
      {/* Navigation Header */}
      <header
        ref={headerRef}
        className="bg-[#4b2e2b] text-[#f5f5dc] shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-20"
      >
        <div className="flex items-center space-x-3">
          <img 
            src="https://media.discordapp.net/attachments/1416781049605914704/1417466815545606195/ShowIdeaLogo.png?ex=68ca9658&is=68c944d8&hm=f2aac09e0efcdf498683ca3e599cf9236f24eee9a8967408aaa1b0bd3673ca11&=&format=webp&quality=lossless&width=385&height=385" 
            alt="Show Idéa Logo" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold">Show Idéa</h1>
        </div>
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection(homeRef, 'home')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'home' 
                ? 'text-[#4b2e2b] bg-[#d2b48c]' 
                : 'text-[#f5f5dc] hover:bg-[#7a5c58] hover:text-[#f5f5dc]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef, 'about')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'about' 
                ? 'text-[#4b2e2b] bg-[#d2b48c]' 
                : 'text-[#f5f5dc] hover:bg-[#7a5c58] hover:text-[#f5f5dc]'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection(productsRef, 'products')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'products' 
                ? 'text-[#4b2e2b] bg-[#d2b48c]' 
                : 'text-[#f5f5dc] hover:bg-[#7a5c58] hover:text-[#f5f5dc]'
            }`}
          >
            Products
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#f5f5dc] hover:text-[#d2b48c] focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="bg-gradient-to-br from-[#4b2e2b] via-[#3a211f] to-[#4b2e2b] text-[#f5f5dc] min-h-screen flex items-center"
        style={{ paddingTop: `${headerHeight}px` }}
      >

        <div className="absolute inset-0 w-full h-full z-0">
          <PhotoSlider />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4b2e2bcc] via-[#3a211fcc] to-[#4b2e2bcc]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="text-[#d2b48c]">Show Idea</span>
            </h1>
            <h2 className="text-5xl md:text-5xl italic mb-6 leading-tight">
              Beauty Without <span className="text-[#d2b48c]">Boundaries</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Discover amazing products that will transform your life. Quality, innovation, and excellence in every item we offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection(productsRef, 'products')}
                className="bg-[#d2b48c] hover:bg-[#c7a977] text-[#4b2e2b] px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Shop Now
              </button>
              <button
                onClick={() => scrollToSection(aboutRef, 'about')}
                className="border-2 border-[#f5f5dc] text-[#f5f5dc] hover:bg-[#f5f5dc] hover:text-[#4b2e2b] px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-20 bg-[#f5f5dc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#4b2e2b] mb-4">About Us</h2>
            <p className="text-xl text-[#7a5c58] max-w-3xl mx-auto">
              We're passionate about bringing you the finest products with exceptional quality and service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#4b2e2b] mb-6">Our Story</h3>
              <p className="text-lg text-[#4b2e2b] mb-6">
                Founded with a vision to provide exceptional products and outstanding customer service, 
                we've been serving our community with dedication and passion. Our commitment to quality 
                and innovation drives everything we do.
              </p>
              <p className="text-lg text-[#4b2e2b] mb-6">
                From humble beginnings to becoming a trusted name in the industry, we continue to grow 
                while maintaining our core values of integrity, excellence, and customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#7a5c58] rounded-full mr-3"></div>
                  <span className="text-[#4b2e2b]">Quality Products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#7a5c58] rounded-full mr-3"></div>
                  <span className="text-[#4b2e2b]">Fast Shipping</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#7a5c58] rounded-full mr-3"></div>
                  <span className="text-[#4b2e2b]">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="bg-[#f0e6d2] p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4b2e2b] mb-2">1000+</div>
                  <div className="text-[#7a5c58]">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4b2e2b] mb-2">500+</div>
                  <div className="text-[#7a5c58]">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4b2e2b] mb-2">5+</div>
                  <div className="text-[#7a5c58]">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4b2e2b] mb-2">99%</div>
                  <div className="text-[#7a5c58]">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-20 bg-[#fff8e7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-[#4b2e2b] mb-4">Our Products</h2>
            <p className="text-xl text-[#7a5c58]">
              Browse our collection of amazing products.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#4b2e2b] text-[#f5f5dc] shadow-lg'
                      : 'bg-[#f5f5dc] text-[#4b2e2b] border border-[#d2b48c] hover:bg-[#d2b48c] hover:text-[#4b2e2b]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Count */}
          <div className="text-center mb-6">
            <p className="text-[#7a5c58]">
              Showing {currentProducts.length} of {filteredProductGroups.length} products
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProducts.map((productGroup, index) => {
              const displayProduct = getDisplayProduct(productGroup);
              
              return (
                <div key={index} className="bg-[#f5f5dc] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-[#d2b48c]">
                  <div
                    className="relative cursor-pointer transform hover:scale-105 transition-transform"
                    onClick={() => openProductModal(productGroup)}
                  >
                    {/* Removed SALE badge from product card - now only shows in modal */}
                    <img
                      src={displayProduct.baseUrl}
                      alt={displayProduct.name}
                      className="w-full h-48 object-cover object-center"
                      onError={(e) =>
                        (e.target.src = `https://placehold.co/400x400/94a3b8/ffffff?text=Image+Not+Found`)
                      }
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#4b2e2b] mb-1">
                      {displayProduct.name}
                    </h3>
                    <p className="text-sm font-medium text-[#7a5c58] mb-3">
                      {displayProduct.category}
                    </p>
                    
                    {productGroup.hasVariants && (
                      <div className="mb-3 pointer-events-none">
                        <div className="text-xs text-[#7a5c58] mb-2">Available colors:</div>
                        <div className="flex flex-wrap gap-1">
                          {productGroup.variants.map((variant) => (
                            <div
                              key={variant.id}
                              className={`text-xs px-2 py-1 rounded border cursor-default ${
                                variant.isActive
                                  ? 'bg-[#eadfc8] border-[#d2b48c] text-[#4b2e2b]'
                                  : 'bg-[#e5e1d6] border-[#cbbfa6] text-[#7a5c58]'
                              }`}
                            >
                              {variant.variant.match(/#(.+)/)?.[1] || variant.variant}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      {displayProduct.onSale ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-[#7a5c58] line-through">₱{displayProduct.originalPrice.toFixed(2)}</span>
                          <span className="text-red-600 font-bold">₱{displayProduct.salePrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-[#4b2e2b] font-bold">₱{displayProduct.originalPrice.toFixed(2)}</span>
                      )}
                      {shouldShowSoldOut(productGroup) && (
                        <p className="text-red-500 font-semibold text-sm mt-1">SOLD OUT</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#f5f5dc] text-[#4b2e2b] border border-[#d2b48c] hover:bg-[#d2b48c]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const shouldShow = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);

                if (!shouldShow) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-3 py-2 text-[#7a5c58]">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 rounded-md font-medium ${
                      currentPage === page
                        ? 'bg-[#4b2e2b] text-[#f5f5dc]'
                        : 'bg-[#f5f5dc] text-[#4b2e2b] border border-[#d2b48c] hover:bg-[#d2b48c]'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#f5f5dc] text-[#4b2e2b] border border-[#d2b48c] hover:bg-[#d2b48c]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}

          {/* No Products Message */}
          {filteredProductGroups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#7a5c58] text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product View Modal */}
      {selectedProduct && (
        <ProductViewModal
          product={selectedProduct}
          onClose={closeProductModal}
          onVariantChange={handleVariantChange}
          variants={productGroups.find(group => 
            group.displayProduct.id.substring(0, group.displayProduct.id.lastIndexOf('-')) === 
            selectedProduct.id.substring(0, selectedProduct.id.lastIndexOf('-'))
          )?.variants}
        />
      )}

      {/* Store Location Map */}
      <section className="py-12 bg-[#f5f5dc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-[#4b2e2b] mb-6 text-center">Visit Our Store</h2>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-[#d2b48c]">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4132645641835!2d125.6136525!3d7.077993500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d0079a7be01%3A0x8107ec74ca041d44!2sShow%20Idea%20Davao!5e0!3m2!1sen!2sph!4v1758019753469!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default LandingPage;