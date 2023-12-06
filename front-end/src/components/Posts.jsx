import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import Post from "./Post";
import PostContext from "../context/PostContext";
import TopicsBar from "./TopicsBar";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts } = useContext(PostContext);
  const [error, setError] = useState();
  const [hasError, setHasError] = useState(false);

  return (
    <Container>
      <TopicsBar
        setIsLoading={setIsLoading}
        setHasError={setHasError}
        setError={setError}
      />
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isLoading && hasError && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      {!isLoading && posts.length == 0 && (
        <p style={{ textAlign: "center" }}>No posts to show.</p>
      )}
      {!isLoading &&
        !hasError &&
        posts &&
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} post={post}></Post>)}
    </Container>
  );
};

export default Posts;
