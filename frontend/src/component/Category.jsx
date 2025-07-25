import { Link } from "react-router-dom";
import category from "../assets/category/caegory";
import { motion } from "framer-motion";

// parent (staggered container)
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// each card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
    },
  },
};

function Category() {
  return (
    <section
      id="Category"
      className="mb-30 flex flex-col justify-center items-center p-4 mt-10 h-fit bg-light-col"
    >
      <h2 className="font-bold text-3xl mb-8">
        <span className="text-red-500">Ca</span>tegory
      </h2>

      <motion.div
        className="category w-full grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))] gap-2 justify-center items-center place-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {category.length > 0 &&
          category.map((prod, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="card flex flex-col items-center h-fit border border-slate-300 text-light-col p-2"
            >
              <Link to={`/${prod.category}/products`}>
                <img
                  src={prod.url}
                  alt="product pic"
                  className="w-full h-full object-cover"
                />
              </Link>
              <p className="text-deep-col">{prod.name}</p>
              <button className="p-1 w-20 bg-red-500 cursor-pointer">
                browse
              </button>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}

export default Category;
