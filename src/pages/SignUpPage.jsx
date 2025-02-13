import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const GradientSphere = () => (
  <div className="relative w-full h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-teal-300 to-orange-300 opacity-50" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72">
      <div className="w-full h-full rounded-full bg-white/30 backdrop-blur-sm" style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)'
      }} />
    </div>
  </div>
);

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    termsAccepted: false,
    newsletter: false
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Gradient Sphere */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-purple-200 via-teal-200 to-orange-200">
        <GradientSphere />
      </div>

      {/* Right side - Sign up form */}
      <div className="w-full md:w-1/2 px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign up for free to access to in any of our products
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-600">
                  Agree to our{' '}
                  <a href="#" className="text-teal-600 hover:text-teal-500">
                    Terms of use
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-teal-600 hover:text-teal-500">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-600">
                  Subscribe to our monthly newsletter
                </label>
              </div>
            </div>

            <div className="space-y-4">
              {/* Recaptcha placeholder */}
              <div className="w-full h-[78px] bg-gray-50 border border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                reCAPTCHA placeholder
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Sign up
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-teal-600 hover:text-teal-500">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;