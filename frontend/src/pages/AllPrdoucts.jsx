import { globalUseContext } from "../state/GlobalState";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function AllProducts() {
  const { products, addCart } = globalUseContext();

  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  const handleAddToCart = async (productId) => {
    await addCart(productId, 1);
  };

  return (
    <section className="m-4 min-h-screen mt-10">
      <h1 className="text-3xl mb-4">
        <span className="text-red-500">All</span>Prod
        <span className="underline">ucts</span>
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {shuffledProducts.length > 0 ? (
          shuffledProducts.map((prod) => (
            <motion.div
              key={prod._id}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="group relative flex flex-col justify-center items-center border border-red-500 p-2 rounded shadow overflow-hidden"
            >
              <Link to={`/product/${prod._id}`}>
                <img
                  src={prod.image[0]?.url}
                  alt={prod.name}
                  className="w-full h-40 object-cover"
                />
              </Link>

              <div className="flex justify-around items-center gap-1">
                <p>review</p>
                {Array(4)
                  .fill(0)
                  .map((__, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                <p>(4)</p>
              </div>
              <p className="mt-2 font-semibold">{prod.name}</p>
              <p className="text-gray-600">${prod.price}</p>
              {/* Button animates on hover */}
              <button
                onClick={() => handleAddToCart(prod._id)}
                className="
                  absolute cursor-pointer left-1/2 transform -translate-x-1/2
                  opacity-0 translate-y-10 scale-95
                  group-hover:opacity-100 group-hover:translate-y-[-50%] group-hover:scale-100
                  transition-all duration-500 ease-out
                  px-3 py-1 bg-red-500 text-white rounded-xl
                  text-sm
                "
              >
                Add to Cart
              </button>
            </motion.div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </section>
  );
}

export default AllProducts;
