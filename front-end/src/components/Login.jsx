import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = () => {
  let [register, setRegister] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {!register && <LoginForm setRegister={setRegister} />}
      {register && <RegisterForm setRegister={setRegister} />}
    </div>
  );
};

export default Login;
