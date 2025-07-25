import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "John Brian",
    role: "CEO, Example Corp",
    text: "This product has completely transformed our workflow. The team loves it, and our productivity has skyrocketed!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Matt Daniel",
    role: "Marketing Lead, Awesome Co",
    text: "Fantastic service and amazing support. I couldn’t imagine going back to the old way of doing things!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Samuel Green",
    role: "Developer, Startup Inc.",
    text: "Slick, intuitive, and very well thought-out. Every detail feels polished and professional.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  }),
};

export default function Testimonials() {
  return (
    <section className="mt-30 py-16 px-4" id="Testimonial">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-deep-col">
          <span className="text-red-500">What</span> Our Customers Say
        </h2>
        <p className="text-gray-600 mb-12">
          Hear from some of our happy customers who use our product every day.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // 👈 animate every time
              custom={i}
              variants={cardVariants}
            >
              <FaQuoteLeft className="text-2xl text-green-400 absolute -top-3 -left-3" />
              <p className="text-gray-700 mb-4">{t.text}</p>
              <div className="flex items-center gap-3 mt-6">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
