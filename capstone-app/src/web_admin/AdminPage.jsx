import React, { useEffect } from "react";

const AdminPage = () => {
  const handleAWSLogin = () => {
    // Redirect directly to AWS Console login for ap-southeast-2 region
    window.location.href = "https://ap-southeast-2.signin.aws.amazon.com/oauth?client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&code_challenge=2DBgooFeamGoTA9iYJVH6lvlaY-NqPoparmO9i1FV8c&code_challenge_method=SHA-256&response_type=code&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26nc2%3Dh_si%26oauthStart%3D1758101104478%26src%3Dheader-signin%26state%3DhashArgsFromTB_ap-southeast-2_fbca35565c5c8501";
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
              src="https://media.discordapp.net/attachments/1416781049605914704/1417466815545606195/ShowIdeaLogo.png?ex=68ca9658&is=68c944d8&hm=f2aac09e0efcdf498683ca3e599cf9236f24eee9a8967408aaa1b0bd3673ca11&=&format=webp&quality=lossless&width=385&height=385" 
              alt="Show Idéa Logo" 
              className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold text-[#4b2e2b] mb-2">Admin Access</h1>
            <p className="text-[#7a5c58] mb-6">Redirecting to AWS Console (Asia Pacific - Sydney) for admin authentication</p>
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
              You will be redirected to the AWS Management Console (ap-southeast-2)
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