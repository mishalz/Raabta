import { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/esm/Row";
import UserContext from "../context/UserContext";
import fetchPostRequest from "../helper/fetchPostRequest";

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

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const url = "/user/login";

    const onFetch = (data) => {
      setIsLoading(false);
      setResponse(data);
      if (data.status == "invalid input") {
        setHasError(true);
      } else if (data.status == "error") {
        setHasError(true);
        setResponse({
          status: "error",
          message: "Login Unsuccessful. Try again.",
        });
      } else if (data.status == "success") {
        setHasError(false);
        setUsername(data.username);
        setToken(data["auth-token"]);
      }
    };

    fetchPostRequest(url, null, body, onFetch);
  };
  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
        <div
          style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
        >
          <span>Don't have an account?</span>
          <Button onClick={() => setRegister(true)} variant="link">
            Register
          </Button>
        </div>
      </Form>
    </>
  );
};
export default LoginForm;
