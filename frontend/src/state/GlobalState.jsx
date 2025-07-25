import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";

// Create the context
const GlobalContext = createContext();

// Custom hook for consuming context
export const globalUseContext = () => useContext(GlobalContext);

// Provider component
export default function GlobalState({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [formType, setFormType] = useState("register");
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check user session and fetch user data
  const checkUserSession = async () => {
    try {
      const response = await axios.get("/api/Auth/me", {
        withCredentials: true,
      });

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      // Only show error toast if it's not a 401 error
      if (error.response?.status !== 401) {
        console.error("Session check error:", error);
        toast.error("Failed to check session");
      }
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  // Check session on mount
  useEffect(() => {
    checkUserSession();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/Product/products`, {
        withCredentials: true,
      });
      const data = res.data.products;
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH CART
  const fetchCart = async () => {
    if (!user) {
      setCarts([]);
      return;
    }

    try {
      const res = await axios.get(`/api/Cart/getall`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setCarts([res.data.cart]);
      } else {
        setCarts([]);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
      // Only show error if it's not an auth error
      if (err.response?.status !== 401) {
        toast.error("Failed to fetch cart");
      }
      setCarts([]);
    }
  };

  // Fetch cart whenever user changes
  useEffect(() => {
    fetchCart();
  }, [user]);

  // ADD TO CART
  const addCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      setShowModal(true);
      setFormType("login");
      return;
    }

    try {
      const res = await axios.post(
        `/api/Cart/add`,
        {
          productId,
          quantity,
        },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        await fetchCart();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
        toast.error("Please login to add items to cart");
        setShowModal(true);
        setFormType("login");
      } else {
        console.error("Failed to add to cart:", err);
        toast.error(err.response?.data?.message || "Failed to add to cart");
      }
    }
  };

  // UPDATE CART QUANTITY
  const updateCartQuantity = async (productId, quantity) => {
    if (!user) {
      toast.error("Please login to update cart");
      setShowModal(true);
      setFormType("login");
      return;
    }

    try {
      const res = await axios.patch(
        `/api/Cart/edit/${productId}`,
        { quantity },
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        await fetchCart();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
        toast.error("Please login to update cart");
        setShowModal(true);
        setFormType("login");
      } else {
        console.error("Failed to update cart:", err);
        toast.error(err.response?.data?.message || "Failed to update cart");
      }
    }
  };

  // DELETE CART ITEM
  const deleteCart = async (productId) => {
    if (!user) {
      toast.error("Please login to remove items");
      setShowModal(true);
      setFormType("login");
      return;
    }

    try {
      const res = await axios.delete(`/api/Cart/delete/${productId}`, {
        withCredentials: true,
      });

      if (res.data?.success) {
        toast.success(res.data.message);
        await fetchCart();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
        toast.error("Please login to remove items");
        setShowModal(true);
        setFormType("login");
      } else {
        console.error("Failed to delete cart item:", err);
        toast.error(
          err.response?.data?.message || "Failed to delete from cart"
        );
      }
    }
  };

  // If the app hasn't finished checking the session, show nothing
  if (!isInitialized) {
    return null;
  }

  return (
    <GlobalContext.Provider
      value={{
        showModal,
        setShowModal,
        formType,
        setFormType,
        setShowCart,
        showCart,
        products,
        setProducts,
        loading,
        user,
        setUser,
        carts,
        setCarts,
        addCart,
        deleteCart,
        updateCartQuantity,
        fetchCart,
        checkUserSession,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalState.propTypes = {
  children: PropTypes.node,
};
