import React from "react";
import { globalUseContext } from "../state/GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_URL;

function Order() {
  const [showAddress, setShowAddress] = React.useState(false);
  const [error, setError] = React.useState("");
  const { carts, updateCartQuantity, deleteCart, user } = globalUseContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Calculate totals
  const subtotal =
    carts?.[0]?.items?.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    ) || 0;
  const shippingFee = 0; // Free shipping
  const tax = subtotal * 0.02; // 2% tax
  const total = subtotal + shippingFee + tax;

  const handleQuantityChange = async (productId, newQuantity) => {
    await updateCartQuantity(productId, parseInt(newQuantity));
  };

  const handleDeleteItem = async (productId) => {
    await deleteCart(productId);
  };

  const handlePlaceOrder = async () => {
    try {
      setError("");
      if (!user) {
        setError("Please login to place an order");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${API_URL}/Order/pay`,
        {},
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (error) {
      console.error("Order error:", error);
      if (error.response?.status === 401) {
        setError("Please login again to continue");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Failed to place order. Please try again.");
      }
    }
  };

  if (!carts?.[0]?.items?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate("/")}
          className="text-indigo-500 hover:underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {carts[0]?.items?.length} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {carts[0]?.items?.map((item) => (
          <div
            key={item.productId._id}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full h-full object-cover"
                  src={item.productId.image[0].url}
                  alt={item.productId.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">
                  {item.productId.name}
                </p>
                <div className="font-normal text-gray-500/70">
                  <p>Category: {item.productId.category}</p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none ml-2"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId._id, e.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ₵{(item.productId.price * item.quantity).toFixed(2)}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => handleDeleteItem(item.productId._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">No address found</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-gray-500 p-2 hover:bg-gray-100"
                >
                  New York, USA
                </p>
                <p
                  onClick={() => setShowAddress(false)}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₵{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₵{tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>₵{total.toFixed(2)}</span>
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2 mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition disabled:bg-gray-400"
          disabled={!user}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Order;
