import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import Col from "react-bootstrap/esm/Col";
import Spinner from "react-bootstrap/esm/Spinner";

const Posts = () => {
  const [topic, setTopic] = useState("health");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostContext);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/posts/${topic}`, {
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [topic]);
  return (
    <Container>
      <Row className="mb-3">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="primary"
            disabled={topic == "health"}
            onClick={() => setTopic("health")}
          >
            Health
          </Button>
          <Button
            variant="warning"
            disabled={topic == "tech"}
            onClick={() => setTopic("tech")}
          >
            Tech
          </Button>
          <Button
            variant="info"
            disabled={topic == "sports"}
            onClick={() => setTopic("sports")}
          >
            Sports
          </Button>
          <Button
            variant="success"
            disabled={topic == "politics"}
            onClick={() => setTopic("politics")}
          >
            Politics
          </Button>
        </ButtonGroup>
      </Row>
      {!isLoading &&
        posts.map((post) => <Post key={post._id} post={post}></Post>)}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner size="lg" />
        </div>
      )}
    </Container>
  );
};

export default Posts;
