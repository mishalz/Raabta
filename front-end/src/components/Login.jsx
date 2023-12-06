import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Login = () => {
  let [register, setRegister] = useState(false);
  return (
    <Row
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "10%",
      }}
    >
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "2px solid grey",
        }}
        md={5}
      >
        <img src="/raabta.jpg" width="50%" />
        <h2>Raabta.</h2>
        <p>Connecting people.</p>
      </Col>

      <Col md={7} style={{ padding: "30px" }}>
        {!register && <LoginForm setRegister={setRegister} />}
        {register && <RegisterForm setRegister={setRegister} />}
      </Col>
    </Row>
  );
};

export default Login;
