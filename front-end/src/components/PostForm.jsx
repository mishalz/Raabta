import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useContext, useRef, useState } from "react";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";

const PostForm = () => {
  const { token } = useContext(UserContext);
  const { setPosts } = useContext(PostContext);
  const [topics, setTopics] = useState([]);

  let [showForm, setShowForm] = useState(false);
  let [error, setError] = useState();
  let [hasError, setHasError] = useState(false);

  let titleRef = useRef();
  let topicRef = useRef();
  let messageRef = useRef();
  let expirationRef = useRef();
  let topicsChoices = ["Health", "Sports", "Tech", "Politics"];
  const handleTopics = (e) => {
    const { value, checked } = e.target;
    console.log(`${value}, ${checked}`);

    if (checked) setTopics((t) => [...t, value]);
    else setTopics((t) => t.filter((e) => e != value));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let post = {
      title: titleRef.current.value,
      topic: topics,
      message: messageRef.current.value,
      expiration: expirationRef.current.value,
    };
    //send the post to the add post api
    await fetch("/posts", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(post), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "invalid input") {
          setHasError(true);
          setError(data.message);
        } else if (data.status == "success") {
          console.log("heard back from the backend");
          console.log(data.post);
          setHasError(false);
          setShowForm(false);
          setPosts((p) => [data.post, ...p]);
        }
      })
      .catch((err) => console.log(err));
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
            Post
          </Button>
        </Form>
      )}
    </Container>
  );
};
export default PostForm;
