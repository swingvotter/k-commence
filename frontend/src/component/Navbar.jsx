import { useState, useEffect } from "react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { globalUseContext } from "../state/GlobalState";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LuDot } from "react-icons/lu";

export default function Navbar() {
  const [userDiv, setUserDiv] = useState(false);
  const [mobileInput, setMobileInput] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Sections");

  const { setShowModal, setShowCart, user, setUser, setCarts, carts } =
    globalUseContext();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/Auth/logout", {}, { withCredentials: true });
      setUser(null);
      setCarts([]);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
    setUserDiv(false);
  };

  const sections = [
    { label: "BestSeller", id: "BestSeller" },
    { label: "Partners", id: "Partners" },
    { label: "Testimonial", id: "Testimonial" },
    { label: "Shipping", id: "Shipping" },
  ];

  const handleSelectSection = (label, id) => {
    setSelectedSection(label);
    setDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="border border-slate-100 flex justify-around max-sm:justify-between items-center p-4 bg-light-col sticky top-0 z-50">
      <div className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-500">
        KCommence
      </div>

      {/* Desktop Menu */}
      <ul className="max-sm:hidden text-[14px] w-100 p-2 flex justify-around items-center">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Dropdown in place of Best Selling - opens on hover */}
        <li
          className="relative cursor-pointer"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="select-none flex items-center gap-1">
            {selectedSection}{" "}
            <svg
              className={`w-4 h-4 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {dropdownOpen && (
            <ul className="absolute top-full mt-0.2 bg-white border border-gray-300 rounded shadow w-40 z-50">
              {sections.map(({ label, id }) => (
                <li
                  key={id}
                  onClick={() => handleSelectSection(label, id)}
                  className="px-4 py-2 hover:bg-deep-col hover:text-white cursor-pointer"
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <Link to="/All-product">All product</Link>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      {/* Icons and mobile menu */}
      <div className="icons w-36 text-xl max-sm:w-fit flex items-center justify-around max-sm:justify-center max-sm:gap-6">
        {/* Desktop Search */}
        <div
          className="search-icon max-sm:hidden relative flex items-center"
          onMouseEnter={() => setShowSearch(true)}
          onMouseLeave={() => setShowSearch(false)}
        >
          <AnimatePresence>
            {showSearch && (
              <motion.input
                key="search-input"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "110px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                type="text"
                className="border border-gray-300 p-0.2 rounded absolute right-6"
                placeholder="Search..."
              />
            )}
          </AnimatePresence>

          <IoIosSearch className="cursor-pointer relative z-10" />
        </div>

        {/* Cart Icon */}
        <div className="cart-icon relative" onClick={() => setShowCart(true)}>
          <PiShoppingCartSimpleThin className="cursor-pointer" />
          <span className="absolute text-red-500 -top-3 right-1 text-[14px]">
            {carts.length > 0 && carts[0].totalCartItems}
          </span>
        </div>

        {/* User Icon */}
        <div
          className="user-icon relative max-sm:hidden"
          onMouseEnter={() => setUserDiv(true)}
          onMouseLeave={() => setUserDiv(false)}
        >
          <FaRegUser className="cursor-pointer" />
          {userDiv && (
            <ul className="p-1 -right-7 top-5 text-slate-600 border bg-white absolute z-50 w-20 border-slate-200 text-[14px] text-center">
              {user ? (
                <button onClick={handleLogout}>
                  <li className="cursor-pointer">logout</li>
                </button>
              ) : (
                <button onClick={handleModal}>
                  <li className="cursor-pointer">register</li>
                </button>
              )}
            </ul>
          )}
          {user && (
            <span className="text-[30px] absolute text-green-700 -top-2 -right-4">
              <LuDot />
            </span>
          )}
        </div>

        {/* Hamburger */}
        <div
          className="hamburger-icon sm:hidden"
          onClick={() => setIsActive((prev) => !prev)}
        >
          {isActive ? <IoMdClose /> : <RxHamburgerMenu />}
        </div>

        {/* Mobile Menu */}
        {isActive && (
          <div className="mobile absolute top-16 left-0 right-0 bg-light-col p-4 text-deep-col">
            <ul className="w-full text-[14px] flex flex-col justify-center items-center gap-2">
              <li className="hover:scale-105 transition-all">
                <Link to="/">Home</Link>
              </li>

              {/* Mobile dropdown replaced by simple links */}
              {sections.map(({ label, id }) => (
                <li key={id} className="hover:scale-105 transition-all">
                  <a
                    href={`#${id}`}
                    onClick={() => setIsActive(false)} // close mobile menu on click
                  >
                    {label}
                  </a>
                </li>
              ))}

              <li className="hover:scale-105 transition-all">
                <Link to="/All-product">All product</Link>
              </li>
              <li className="hover:scale-105 transition-all">
                <a href="#contact">Contact</a>
              </li>
            </ul>

            <div className="search-icon w-full flex items-center justify-center mt-2">
              {mobileInput ? (
                <input
                  type="text"
                  className="p-1 w-56 border"
                  placeholder="search items"
                />
              ) : (
                <IoIosSearch
                  className="cursor-pointer text-2xl"
                  onMouseEnter={() => setMobileInput(true)}
                  onMouseLeave={() => setMobileInput(false)}
                />
              )}
            </div>

            <div className="login-logout-btn flex justify-center items-center mt-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="p-1 w-36 bg-red-400 cursor-pointer text-[14px] text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="p-1 w-36 bg-sky-400 cursor-pointer text-[14px] text-white"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
