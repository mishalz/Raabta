import { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/esm/Row";
import UserContext from "../context/UserContext";

const LoginForm = ({ setRegister }) => {
  const { setToken, setUsername } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState();
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    await fetch("/user/login", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setResponse(data);
        if (data.status == "invalid input") {
          setHasError(true);
        } else if (data.status == "success") {
          setHasError(false);
          setUsername(data.username);
          setToken(data["auth-token"]);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {hasError && <p style={{ color: "red" }}>{response.message}</p>}

        <Button variant="primary" type="submit">
          {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
        <div style={{ marginTop: "10px" }}>
          Don't have an account?
          <Button onClick={() => setRegister(true)} variant="link">
            Register
          </Button>
        </div>
      </Form>
    </>
  );
};
export default LoginForm;
