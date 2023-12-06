import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useContext, useRef, useState } from "react";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import fetchPostRequest from "../helper/fetchPostRequest";

const PostForm = () => {
  const { token, setToken } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);

  const [topics, setTopics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const [hasError, setHasError] = useState(false);

  const titleRef = useRef();
  const messageRef = useRef();
  const expirationRef = useRef();
  const topicsChoices = ["Health", "Sports", "Tech", "Politics"];

  const handleTopics = (e) => {
    const { value, checked } = e.target;
    if (checked)
      setTopics((t) => {
        if (!t.includes(value)) return [...t, value];
        else return [...t];
      });
    else {
      setTopics((t) => {
        if (t.includes(value)) return t.filter((e) => e != value);
        else return [...t];
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);
    let post = {
      title: titleRef.current.value,
      topic: topics,
      message: messageRef.current.value,
      expiration: expirationRef.current.value,
    };
    const url = "/posts";
    const onFetch = (data) => {
      if (data.status == "authorization error") {
        setTimeout(() => {
          setToken(null);
        }, 1000);
        setHasError(true);
        setError(data.message);
      } else if (data.status == "invalid input") {
        setHasError(true);
        setError(data.message);
      } else if (data.status == "error") {
        setHasError(true);
        setError("Post could not be uploaded. Try again.");
      } else if (data.status == "success") {
        setHasError(false);
        setShowForm(false);
        setTopics([]);
        setPosts((p) => [data.post, ...p]);
      }
      setIsSubmitting(false);
    };
    //send the post to the add post api
    fetchPostRequest(url, token, post, onFetch);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Button variant="primary" onClick={() => setShowForm((s) => !s)}>
          Add new post
        </Button>
      </Row>
      {showForm && (
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} className="mb-3" controlId="postFormTitle">
            <Form.Label column sm="2" md="2" lg="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                ref={titleRef}
                required
                type="title"
                placeholder="Title"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="postFormTopic">
            <Form.Label column sm="2" md="2" lg="2">
              Topics
            </Form.Label>
            <Col sm="10" md="10" lg="10">
              {topicsChoices.map((topic) => (
                <Form.Check // prettier-ignore
                  key={topic}
                  type="checkbox"
                  id={topic}
                  label={topic}
                  value={topic.toLowerCase()}
                  onChange={handleTopics}
                />
              ))}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="postFormMessage">
            <Form.Label column sm="2" md="2" lg="2">
              Message
            </Form.Label>
            <Col sm="10" md="10" lg="10">
              <Form.Control ref={messageRef} as="textarea" rows={3} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="postFormDate">
            <Form.Label column sm="2" md="2" lg="2">
              Expiration Date
            </Form.Label>
            <Col sm="10" md="10" lg="10">
              <Form.Control ref={expirationRef} type="date" />
            </Col>
          </Form.Group>

          {hasError && <p style={{ color: "red" }}>{error}</p>}

          <Button className="mb-3" variant="dark" type="submit">
            {isSubmitting ? <Spinner size="sm" /> : "Post "}
          </Button>
        </Form>
      )}
    </Container>
  );
};
export default PostForm;
