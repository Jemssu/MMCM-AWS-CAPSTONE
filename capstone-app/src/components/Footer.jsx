import React, { useState } from 'react';

const Footer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt:', loginForm);
    
    // Example: Simple check (replace with your actual authentication)
    if (loginForm.username === 'admin' && loginForm.password === 'password') {
      alert('Login successful! Redirecting to staff dashboard...');
      setIsLoginModalOpen(false);
      // Add redirect logic here
    } else {
      alert('Invalid credentials. Please try again.');
    }
    
    // Reset form
    setLoginForm({ username: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
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
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12-5.373-12-12-12zm4.398 12.001c0-2.306-1.892-4.175-4.244-4.175s-4.244 1.869-4.244 4.175c0 1.948 1.353 3.585 3.197 4.075v-.895c-.961-.482-1.622-1.488-1.622-2.316 0-1.378 1.12-2.5 2.5-2.5s2.5 1.122 2.5 2.5c0 .828-.661 1.834-1.622 2.316v.895c1.844-.49 3.197-2.127 3.197-4.075z"></path>
            </svg>
          </a>
          <a href="https://www.lazada.com.ph" target="_blank" rel="noopener noreferrer" aria-label="Lazada">
            <svg className="w-8 h-8 text-gray-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.001 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.178 15.688c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm.001-4.062c-1.122 0-2.034-.912-2.034-2.034s.912-2.034 2.034-2.034 2.034.912 2.034 2.034-.912 2.034-2.034 2.034zm-3.25 4.062c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm.001-4.062c-1.122 0-2.034-.912-2.034-2.034s.912-2.034 2.034-2.034 2.034.912 2.034 2.034-.912 2.034-2.034 2.034z"></path>
            </svg>
          </a>
        </div>
        <div>
          © 2025 Show Idéa. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;