import { motion } from "framer-motion";
import blog from "../assets/blog/blog";

function Blog() {
  return (
    <section className="min-h-screen p-4 mt-20 flex flex-col justify-center items-center">
      {/* Header */}
      <div className="text-center mb-8 px-2">
        <h1 className="font-black text-2xl sm:text-3xl">
          <span className="text-red-500">Recent</span> News
        </h1>
        <p className="text-sm text-slate-500">
          Explore our latest news & updates
        </p>
      </div>

      {/* Blog Grid */}
      <div className="w-full max-w-6xl px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blog.length > 0 &&
            blog.map((b, i) => (
              <motion.div
                key={i}
                className="bg-white shadow-md rounded-xl p-3 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  type: "spring",
                  bounce: 0.3,
                }}
              >
                <a href={b.link} className="flex flex-col h-full">
                  <img
                    src={b.url}
                    alt="blog"
                    className="mb-2 rounded-2xl w-full h-40 object-cover"
                  />
                  <h4 className="font-black mb-2 capitalize text-lg">
                    {b.title}
                  </h4>
                  <p className="text-gray-600 text-sm flex-grow">
                    {b.description}
                  </p>
                </a>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
