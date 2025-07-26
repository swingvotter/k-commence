import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="Contact" className="bg-deep-col text-white p-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
            KCommence
          </div>
          <p className="max-w-sm text-white/90">
            Your one-stop shop for the best products with trusted partners and
            seamless shipping.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2 border-b border-white/50 pb-1">
            Quick Links
          </h3>
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link
            to="/All-product"
            className="hover:text-gray-200 transition-colors"
          >
            All Product
          </Link>
          <a
            href="#best-selling"
            className="hover:text-gray-200 transition-colors"
          >
            Best Selling
          </a>
          <a href="#partners" className="hover:text-gray-200 transition-colors">
            Partners
          </a>
          <a
            href="#testimonial"
            className="hover:text-gray-200 transition-colors"
          >
            Testimonial
          </a>
          <a href="#shipping" className="hover:text-gray-200 transition-colors">
            Shipping
          </a>
          <a href="#contact" className="hover:text-gray-200 transition-colors">
            Contact
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 max-w-xs">
          <h3 className="font-semibold text-lg mb-2 border-b border-white/50 pb-1">
            Contact Us
          </h3>
          <p>Email: support@kcommence.com</p>
          <p>Phone: +233 553618615</p>
          <p>Address: 123 Commerce St, Business City</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-3 text-white/90">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} KCommence. All rights reserved.
      </div>
    </footer>
  );
}
