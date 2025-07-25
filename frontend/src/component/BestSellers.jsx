import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { globalUseContext } from "../state/GlobalState";

// Animations (keep as is)
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
};
const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function BestSellers() {
  const { products, loading, addCart } = globalUseContext();

  // Filter for headset products
  const headsets = products.filter(
    (prod) => prod.category?.toLowerCase() === "headset"
  );

  return (
    <section
      id="BestSeller"
      className="w-screen h-fit mt-12 flex flex-col justify-center items-center gap-2"
    >
      {/* Animated heading */}
      <motion.h2
        className="font-bold text-3xl m-6 text-red-500"
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        Best<span className="border-b-2 text-gray-700">Sellers</span>
      </motion.h2>

      {loading ? (
        <p>Loading...</p>
      ) : headsets.length === 0 ? (
        <p>No headsets found.</p>
      ) : (
        <motion.div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 place-items-center p-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {headsets.map((prod) => (
            <motion.div
              key={prod._id}
              variants={cardVariants}
              className="group relative flex flex-col justify-center items-center p-2"
            >
              <Link to={`/product/${prod._id}`}>
                <img
                  src={prod.image[0]?.url}
                  alt={prod.name}
                  className="w-full h-40 object-contain"
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
              <p>{prod.name}</p>
              <p>₵{prod.price}</p>

              <button
                onClick={() => addCart(prod._id)}
                className="
                  absolute bottom-2
                  opacity-0 translate-y-4 scale-95 
                  group-hover:opacity-100 group-hover:-translate-y-30 group-hover:scale-100
                  transition-all duration-600
                  p-1 bg-red-500 rounded-xl
                  cursor-pointer text-[14px] text-light-col
                "
              >
                add to cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default BestSellers;
