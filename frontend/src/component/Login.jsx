import { useState } from "react";
import { globalUseContext } from "../state/GlobalState";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [formInput, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInputValue({ ...formInput, [e.target.name]: e.target.value });
  };

  const { setFormType, setShowModal, checkUserSession } = globalUseContext();

  const handleLogin = async () => {
    if (!formInput.email || !formInput.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Login to get the cookie set
      await axios.post(
        `/api/Auth/login`,
        formInput,
        { withCredentials: true }
      );

      // Fetch user data and update session
      await checkUserSession();

      toast.success("🎉 Login successful!");
      setShowModal(false);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "🚫 Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative text-black p-5 w-74 bg-white  flex flex-col  gap-2 ">
      <h1 className="mt-2 mb-4 text-center">
        User <span className="text-green-500">login</span>
      </h1>
      <div
        onClick={() => setShowModal(false)}
        className="close absolute right-2 top-1 cursor-pointer"
      >
        <IoMdClose />
      </div>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="relative w-full group">
          <input
            name="email"
            onChange={handleInput}
            className="border w-full p-1 border-slate-300 peer focus:outline-0"
            type="email"
          />
          <label
            className={`${
              formInput.email.length > 0 ? "-translate-y-8" : ""
            } transition-all duration-300 absolute  peer-focus:-translate-y-8 left-1 bottom-1 text-slate-600 group-hover:-translate-y-8`}
          >
            Email
          </label>
        </div>
        <div className="relative  w-full group">
          <input
            onChange={handleInput}
            name="password"
            className="border w-full p-1 border-slate-300 peer focus:outline-0"
            type="password"
            id="pass"
          />
          <label
            className={`${
              formInput.password.length > 0 ? "-translate-y-8" : ""
            } transition-all duration-300 absolute  peer-focus:-translate-y-8 left-1 bottom-1 text-slate-600 group-hover:-translate-y-8`}
          >
            Password
          </label>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`cursor-pointer w-full p-2 text-light-col transition ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <div className="text-[13px] mt-4 ">
        Create an account ?
        <button
          onClick={() =>
            setFormType((prev) => (prev === "login" ? "register" : "login"))
          }
          className="cursor-pointer text-green-500 ml-1"
        >
          click here
        </button>
      </div>
    </div>
  );
}

export default Login;
