import React, { useState } from 'react';
import { Eye, EyeOff, Facebook, Twitter } from 'lucide-react';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('English (United States)');
  
  return (
    <div className="min-h-screen bg-white">
      

      {/* Main Content */}
      <main className="max-w-md mx-auto pt-16 px-4">
        <h1 className="text-3xl font-semibold text-center mb-2">Log in</h1>
        
        <p className="text-center text-gray-600 text-sm mb-8">
          New to Buzz Shop ? <a href="/register" className="text-blue-600 hover:text-blue-700 transition-colors">Sign up for free</a>
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Log in
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">or</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <Facebook size={20} className="text-blue-600" />
              <span className="text-sm">Facebook</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <Twitter size={20} className="text-blue-400" />
              <span className="text-sm">Twitter</span>
            </button>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
          >
            <img src="/api/placeholder/20/20" alt="SSO" className="w-5 h-5" />
            <span className="text-sm">Log in with Google</span>
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignInPage;