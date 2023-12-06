import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import PostContext from "../context/PostContext";
import UserContext from "../context/UserContext";
import fetchGetRequest from "../helper/fetchGetRequest";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";

const TopicsBar = ({ setIsLoading, setError, setHasError }) => {
  const [topic, setTopic] = useState("health");
  const { token, setToken } = useContext(UserContext);
  const { setPosts, setLikedPosts, setDislikedPosts } = useContext(PostContext);
  const [sortingOpt, setSortingOpt] = useState("createdAt");

  useEffect(() => {
    setIsLoading(true);
    const url = `/posts/${topic}`;
    const onFetch = (data) => {
      if (data.status == "authorization error") {
        setTimeout(() => {
          setToken(null);
        }, 1000);
        setHasError(true);
        setError(data.message);
      } else if (data.status == "success") {
        setPosts(data.posts);
        setLikedPosts(data.likedPosts);
        setDislikedPosts(data.dislikedPosts);
      } else if (data.status == "error") {
        setHasError(true);
        setError(`Unable to fetch posts for ${topic}. Try again.`);
      }
      setIsLoading(false);
    };

    fetchGetRequest(url, token, onFetch, sortingOpt);
  }, [topic, sortingOpt]);

  return (
    <>
      <Row className="mb-3">
        <ButtonGroup aria-label="Basic example" style={{ padding: "0px" }}>
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
      <Row className="mb-3">
        <Form.Select
          aria-label="Sort by:"
          value={sortingOpt}
          onChange={(e) => setSortingOpt(e.target.value)}
        >
          <option>Sort by: </option>
          <option value="likes">Most Likes</option>
          <option value="dislikes">Most Dislikes</option>
          <option value="createdAt">Latest</option>
          <option value="comments">Most Comments</option>
        </Form.Select>
      </Row>
    </>
  );
};

export default TopicsBar;
