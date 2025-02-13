import React from "react";
import Navbar from "../components/Navbar";

// Dynamic Images
import adidasLogo from "../assets/imgs/adidas.png";
import gucciLogo from "../assets/imgs/gucciLogo.png";
import pumaLogo from "../assets/imgs/pumaLogo.png";
import nikeLogo from "../assets/imgs/nikeLogo.png";
import lvLogo from "../assets/imgs/lvLogo.png";
import heroImage from "../assets/imgs/hero.png";
import product1 from "../assets/imgs/samples/adidas.png";
import product2 from "../assets/imgs/samples/gucci.png";
import product3 from "../assets/imgs/samples/puma.png";
import product4 from "../assets/imgs/samples/nike1.png";
import product5 from "../assets/imgs/samples/lv.png";
import product6 from "../assets/imgs/samples/fashion.png";

const BrandLogo = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="h-28 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
  />
);

const ProductCard = ({ imageSrc, className = "" }) => {
  const handleshop = ()=>{
    window.location.href = '/products'
  }
  return (<div onClick={handleshop} className={`overflow-hidden group cursor-pointer ${className}`}>
    <div className="relative overflow-hidden">
      <img
        src={imageSrc}
        alt="Product"
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
    </div>
  </div>)
};

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold mb-6">BEST OUTFIT</h1>
            <p className="text-gray-300 mb-8">
              Fashion is a form of self-expression and autonomy at a particular period of economy
            </p>
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors transform hover:scale-105 duration-300">
              GET STARTED
            </button>
            <div className="mt-12 flex gap-8">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-gray-400">Total customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">30K+</div>
                <div className="text-sm text-gray-400">Client reviews</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <BrandLogo src={adidasLogo} alt="Adidas" />
            <BrandLogo src={gucciLogo} alt="Gucci" />
            <BrandLogo src={pumaLogo} alt="Puma" />
            <BrandLogo src={nikeLogo} alt="Nike" />
            <BrandLogo src={lvLogo} alt="Louis Vuitton" />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">TRENDING NOW →</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard imageSrc={product1} />
            <ProductCard imageSrc={product2} />
            <ProductCard imageSrc={product3} />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">PRODUCTS</h2>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              See all →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard imageSrc={product4} />
            <ProductCard imageSrc={product5} />
            <ProductCard imageSrc={product6} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">BuzzShop</h3>
              <p className="text-gray-400">Your Safe Style Link</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Useful Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Style News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refer a Friend
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Our Menu</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Top Selling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Categories
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;