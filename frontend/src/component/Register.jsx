import { useState } from "react";
import { globalUseContext } from "../state/GlobalState";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_URL;

function Register() {
  const [formInput, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setFormType, setShowModal } = globalUseContext();

  const handleInput = (e) => {
    setInputValue({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/Auth/register`,
        formInput,
        { withCredentials: true }
      );

      const msg = res.data.message;
      console.log(msg);

      toast.success(msg || "Registration successful!");

      setFormType("login");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative text-black p-5 w-74 h-fit bg-white  flex flex-col  gap-2 ">
      <h1 className="mt-2 mb-4 text-center">
        user <span className="text-green-500">register</span>
      </h1>
      <div
        onClick={() => setShowModal(false)}
        className="close absolute right-2 top-1 cursor-pointer"
      >
        <IoMdClose />
      </div>
      <form onSubmit={handleSub}>
        <div className=" flex flex-col justify-center items-center gap-6">
          {/* ---username start here */}
          <div className="relative w-full group">
            <input
              name="username"
              onChange={handleInput}
              className="border w-full p-1 border-slate-300 peer focus:outline-0"
              type="text"
            />
            <label
              className={`${
                formInput.username.length > 0 ? "-translate-y-8" : ""
              } transition-all duration-300 absolute  peer-focus:-translate-y-8 left-1 bottom-1 text-slate-600 group-hover:-translate-y-8`}
            >
              username
            </label>
          </div>
          {/* ----email start here */}
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
          {/* ---password start here */}
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
          <button className="cursor-pointer bg-green-500 w-full p-2 text-light-col">
            register
          </button>
        </div>
      </form>
      <div className="text-[13px] mt-4 ">
        have an account ?
        <button
          onClick={() =>
            setFormType((prev) => (prev === "register" ? "login" : "register"))
          }
          className="cursor-pointer text-green-500 ml-1"
        >
          login
        </button>
      </div>
    </div>
  );
}

export default Register;
