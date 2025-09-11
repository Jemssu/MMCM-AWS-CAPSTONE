import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === index + 1
              ? "bg-purple-800 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;