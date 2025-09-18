import React, { useEffect } from "react";

const AdminPage = () => {
const handleAWSLogin = () => {
    // Redirect directly to AWS Console login in ap-southeast-1
    window.location.href =
    "https://466171398124.signin.aws.amazon.com/console?region=ap-southeast-1";
};


  // Optional: Auto-redirect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleAWSLogin();
    }, 3000); // Auto-redirect after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-[#d2b48c] text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <img 
              src="https://my-products-images-list.s3.ap-southeast-1.amazonaws.com/Website/Logo/ShowIdeaLogo.png" 
              alt="Show Idéa Logo" 
              className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold text-[#4b2e2b] mb-2">Admin Access</h1>
            <p className="text-[#7a5c58] mb-6">Redirecting to AWS Console (Asia Pacific - Singapore) for admin authentication</p>
          </div>

          {/* Loading Animation */}
          <div className="mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4b2e2b] mx-auto mb-4"></div>
            <p className="text-[#7a5c58] text-sm">Redirecting to AWS login...</p>
          </div>

          {/* Manual Redirect Button */}
          <button
            onClick={handleAWSLogin}
            className="w-full bg-[#4b2e2b] hover:bg-[#3a211f] text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4"
          >
            Go to AWS Console
          </button>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-[#7a5c58] mb-2">
              You will be redirected to the AWS Management Console (ap-southeast-1)
            </p>
            <p className="text-xs text-[#7a5c58]">
              Use your AWS root user credentials or IAM user credentials to sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;