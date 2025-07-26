import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./component/Category";
import BestSellers from "./component/BestSellers";
import Shipping from "./component/Shipping";
import Blog from "./component/Blog";
import Testimonials from "./component/Testimonial";
import Patners from "./component/Patners";
import Footer from "./component/Footer";
import AllPrdoucts from "./pages/AllPrdoucts";
import Product from "./pages/Product";
import CategoryProduct from "./pages/CategoryProduct";
import { Toaster } from "react-hot-toast";
import { globalUseContext } from "./state/GlobalState";
import Modal from "./component/Modal";
import Cart from "./component/Cart";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";

function App() {
  const { showModal, showCart } = globalUseContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home>
                <Category />
                <BestSellers />
                <Shipping />
                <Blog />
                <Testimonials />
                <Patners />
              </Home>
            }
          />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/All-product" element={<AllPrdoucts />} />
          <Route path="/:categoryId/products" element={<CategoryProduct />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showModal && (
          <div className="w-full h-full z-150 fixed top-0 left-0">
            <Modal />
          </div>
        )}
        {showCart && (
          <div className="bg-white text-deep-col h-fit z-110 fixed right-4 top-20">
            <Cart />
          </div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </div>
  );
}

export default App;
