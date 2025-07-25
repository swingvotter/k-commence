import { MdLocalShipping } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { motion } from "framer-motion";

const items = [
  {
    icon: <MdLocalShipping className="text-6xl text-deep-col" />,
    title: "Free Shipping",
    text: "Free Shipping On All Orders",
  },
  {
    icon: <MdOutlinePayment className="text-6xl text-deep-col" />,
    title: "Secure Payment",
    text: "100% Secure Payment",
  },
  {
    icon: <MdContactSupport className="text-6xl text-deep-col" />,
    title: "24/7 Support",
    text: "We’re Here To Help",
  },
  {
    icon: <AiOutlineSafety className="text-6xl text-deep-col" />,
    title: "Buyer Protection",
    text: "Shop With Confidence",
  },
];

function Shipping() {
  return (
    <section
      id="Shipping"
      className=" p-4 mt-50 flex flex-col gap-y-10  justify-center items-center"
    >
      <div>
        <h1 className="text-3xl font-black">
          <span className="text-red-500">Shipping</span> made easy{" "}
        </h1>
        <p className="text-slate-500 text-[14px]">Explore our shipemnt</p>
      </div>
      <div className="justify-self-center p-4  text-[14px] max-xs:grid-cols-2 max-xs:gap-8  w-screen grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex gap-2 items-center"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              duration: 1,
              delay: index * 0.2, // stagger each item by 0.2s
            }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {item.icon}
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Shipping;
