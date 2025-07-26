import { Link, useParams } from "react-router-dom";
import { globalUseContext } from "../state/GlobalState";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

function CategoryProduct() {
  const { products } = globalUseContext();

  const { categoryId } = useParams();

  const filterCategory = products.filter(
    (prod) => prod.category === categoryId
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

  console.log("products::::", products);
  console.log("filtered", filterCategory);
  console.log("categoryId:::", categoryId);

  return (
    <section className="m-4 min-h-screen mt-10">
      <h1 className="text-3xl mb-4">
        <span className="text-red-500">{categoryId.slice(0, 3)}</span>
        {categoryId.slice(3)}
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {filterCategory.length > 0 ? (
          filterCategory.map((prod) => (
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
              <p className="text-gray-600">₵{prod.price}</p>
              {/* Button animates on hover */}
              <button
                onClick={() => console.log("add to cart btn clicked")}
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

export default CategoryProduct;
