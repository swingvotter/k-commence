import Register from "./Register";
import { globalUseContext } from "../state/GlobalState";
import Login from "./Login";

export default function Model() {
  const { formType } = globalUseContext();

  return (
    <div className="bg-[rgba(0,0,0,0.4)] h-full flex justify-center items-center">
      {formType === "register" ? <Register /> : <Login />}
    </div>
  );
}
