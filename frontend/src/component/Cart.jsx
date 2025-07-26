import { IoMdClose } from "react-icons/io";
import { globalUseContext } from "../state/GlobalState";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { setShowCart, carts, updateCartQuantity, deleteCart } =
    globalUseContext();
  const navigate = useNavigate();

  const cartItems = carts?.[0]?.items || [];
  const totalItems = carts?.[0]?.totalCartItems || 0;

  const handleQuantityChange = async (productId, newQuantity) => {
    await updateCartQuantity(productId, parseInt(newQuantity));
  };

  const handleDeleteItem = async (productId) => {
    await deleteCart(productId);
  };

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/order");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="relative flex flex-col h-screen max-h-screen px-6 py-10 bg-light-col">
      {/* Close Button */}
      <div
        onClick={() => setShowCart(false)}
        className="absolute right-2 top-1 cursor-pointer text-2xl text-red-500"
      >
        <IoMdClose />
      </div>

      {/* Header */}
      <h1 className="text-3xl font-medium mb-4">
        Shopping Cart{" "}
        <span className="text-sm text-indigo-500">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </h1>

      {/* Table Headers */}
      <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
        <p className="text-left">Product Details</p>
        <p className="text-center">Subtotal</p>
        <p className="text-center">Action</p>
      </div>

      {/* Cart Items Area */}
      <div className="flex-1 overflow-y-auto pr-2 mb-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-700 py-4 border-t"
            >
              {/* Product Details */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border border-gray-300 rounded overflow-hidden">
                  <img
                    src={item.productId.image[0].url}
                    alt={item.productId.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold">{item.productId.name}</p>
                  <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                    <span>Qty:</span>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId._id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 outline-none"
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

              {/* Subtotal */}
              <p className="text-center font-medium">
                ₵{(item.productId.price * item.quantity).toFixed(2)}
              </p>

              {/* Delete */}
              <button
                onClick={() => handleDeleteItem(item.productId._id)}
                className="text-center text-red-500 text-xl cursor-pointer"
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        )}
      </div>

      {/* Footer: Total & Checkout */}
      {cartItems.length > 0 && (
        <div className="border-t pt-4 bg-white sticky bottom-0 shadow-inner">
          <div className="text-right mb-2">
            <p className="text-lg font-medium">
              Total:{" "}
              <span className="text-indigo-600">₵{total.toFixed(2)}</span>
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCheckout}
              className="
                px-6 py-3 mb-4 
                text-dark-col
                border
                border-red-500 
                bg-white 
                rounded-lg 
                hover:bg-red-400 
                transition 
                shadow-md
                font-semibold
              "
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
