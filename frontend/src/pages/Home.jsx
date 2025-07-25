import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../assets/best&Trending/HeroImages";
import { GoDotFill } from "react-icons/go";
import PropTypes from "prop-types";

function Home({ children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev === Hero.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section>
      {/* hero section start */}
      <div className=" max-sm:h-fit gap-2 mb-30 flex flex-col justify-center items-center border h-screen capitalize p-4 text-light-col bg-deep-col relative overflow-hidden">
        <div className="carousel-card gap-2 max-sm:flex-col max-sm:justify-center max-sm:items-center flex justify-center items-center">
          {/* Text Section */}
          <div className="left-text mt-8 p-2 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={Hero[index].name + "-text"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="font-bold">best solo</h2>
                <h3 className="font-bold max-sm:text-2xl text-4xl mt-2">
                  {Hero[index].more}
                </h3>
                <h4 className="font-bold text-6xl max-sm:text-3xl mt-4">
                  {Hero[index].name}
                </h4>
                <button className="cursor-pointer p-2 bg-red-500 rounded-xl mt-4">
                  shop by category
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Section */}
          <div className="image-card max-sm-w-fit sm:w-80 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={Hero[index].url}
                src={Hero[index].url}
                alt="headphone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full max-sm:h-70 max-sm:w-70"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-1 justify-center items-center mt-4">
          {Hero.map((_, i) => (
            <div key={i} className="cursor-pointer">
              <GoDotFill
                onClick={() => setIndex(i)}
                className={`text-xl transition-all duration-300 ${
                  index === i ? "text-light-col scale-105" : "text-slate-500"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* category section */}
      <div>{children}</div>
    </section>
  );
}

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;
