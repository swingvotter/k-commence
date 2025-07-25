import { useParams, useNavigate } from "react-router-dom";
import { globalUseContext } from "../state/GlobalState";
import { FaStar } from "react-icons/fa6";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addCart } = globalUseContext();

  const findSingleProd = products.find((prod) => prod._id === id);

  if (!findSingleProd) {
    return <p className="p-4 text-center">Product not found.</p>;
  }

  const handleAddToCart = async () => {
    await addCart(findSingleProd._id, 1);
  };

  const handleBuyNow = async () => {
    await addCart(findSingleProd._id, 1);
    navigate("/order");
  };

  return (
    <section className="p-4 flex flex-col md:flex-row items-center md:items-start justify-center gap-4">
      {/* Image Card */}
      <div className="img-card w-full max-w-xs md:max-w-md">
        <img
          className="w-full h-auto rounded shadow"
          src={findSingleProd.image[0].url}
          alt={findSingleProd.name}
        />
      </div>

      {/* Product Details */}
      <div className="prod-detail-card w-full md:w-1/2 p-2 flex flex-col gap-4">
        <h2 className="font-bold text-2xl md:text-3xl">
          {findSingleProd.name}
        </h2>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {Array(4)
            .fill(0)
            .map((__, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          <p className="text-sm">(4)</p>
        </div>

        {/* Price */}
        <div>
          <h3 className="font-bold text-xl md:text-2xl">
            MRP: ₵{findSingleProd.price}
          </h3>
          <p className="text-[13px] text-slate-500">inclusive of tax</p>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-bold text-lg md:text-xl">About Product</h4>
          <p className="text-sm md:text-base text-slate-600">
            {findSingleProd.description}
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold uppercase tracking-wide"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-semibold uppercase tracking-wide"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
