import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";

const RegisterForm = ({ setRegister }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let username = usernameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    await fetch("/user/register", {
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
      body: JSON.stringify({ username, email, password }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setResponse(data);
        if (data.status == "invalid input") {
          setSuccess(false);
          setHasError(true);
        } else if (data.status == "success") {
          setSuccess(true);
          setHasError(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {success && (
        <Alert variant="success">User Registered! You can login now.</Alert>
      )}
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="registerUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameRef}
            required
            type="username"
            placeholder="Enter username"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="registerEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="registerPassword">
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
        <div style={{ marginTop: "10px" }}>
          Already have an account?
          <Button onClick={() => setRegister(false)} variant="link">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};
export default RegisterForm;
