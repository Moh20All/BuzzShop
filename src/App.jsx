import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import Navbar from "./components/Navbar"; // Import Navbar
import SignUpPage from "./pages/SignUpPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";

// Layout Component (Optional)
const Layout = ({ children }) => {
  return (
    <div className="main">
      <Navbar /> {/* Navbar will appear on all pages */}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* MainPage Route */}
        <Route
          path="/"
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />

        {/* SignInPage Route */}
        <Route
          path="/signin"
          element={
            <Layout>
              <SignInPage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />
        <Route
         path="/products/:id"
          element={<Layout>
            <ProductDetails />
          </Layout>
        } 
        />
        <Route
         path="/cart"
          element={<Layout>
            <ShoppingCart />
          </Layout>
        } 
        />
      </Routes>
    </Router>
  );
}

export default App;