import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import fetchPostRequest from "../helper/fetchPostRequest";

const RegisterForm = ({ setRegister }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState();

  //event handler for when the user clicks the register button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const url = "/user/register";
    const onFetch = (data) => {
      setIsLoading(false);
      setResponse(data);
      if (data.status == "error") {
        setHasError(true);
        setResponse({
          status: "error",
          message: "Registration Unsuccessful. Try again.",
        });
      } else if (data.status == "invalid input") {
        setSuccess(false);
        setHasError(true);
      } else if (data.status == "success") {
        setSuccess(true);
        setHasError(false);
      }
    };

    fetchPostRequest(url, null, body, onFetch);
  };
  return (
    <>
      {success && (
        <Alert variant="success">User Registered! You can login now.</Alert>
      )}
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameRef}
            required
            type="username"
            placeholder="Enter username"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
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
          {isLoading ? <Spinner animation="border" size="sm" /> : "Register"}
        </Button>
        <div
          style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
        >
          <span>Already have an account?</span>
          <Button onClick={() => setRegister(false)} variant="link">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};
export default RegisterForm;
