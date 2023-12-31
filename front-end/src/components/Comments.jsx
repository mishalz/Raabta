import { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import UserContext from "../context/UserContext";
import Comment from "./Comment";
import Spinner from "react-bootstrap/esm/Spinner";
import Button from "react-bootstrap/esm/Button";
import fetchPostRequest from "../helper/fetchPostRequest";
import fetchGetRequest from "../helper/fetchGetRequest";

const Comments = ({ postid, setNoOfComments, expired }) => {
  //the states of the component
  const [comments, setComments] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //retrieving the token and settoken from the context
  const { token, setToken, username } = useContext(UserContext);

  const commentRef = useRef();

  //for fetching the comments when the component is rendered
  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);

    const url = `/posts/comments/${postid}`;

    const onFetch = (data) => {
      if (data.status == "authorization error") {
        setTimeout(() => {
          setToken(null);
        }, 1000);
        setFetchError(data.message);
      } else if (data.status == "success") {
        setFetchError(null);
        setComments(data.comments);
        setNoOfComments(data.comments.length);
      } else if (data.status == "error") {
        setFetchError("Unable to fetch comments.");
      }
      setIsLoading(false);
    };

    fetchGetRequest(url, token, onFetch);
  }, []);

  //event handler for when a comment is submitted for a post
  const addComment = async () => {
    setIsSubmitting(true);
    setPostError(false);
    let body = { body: commentRef.current.value, author: username };
    let url = `/posts/comments/${postid}`;

    const onFetch = (data) => {
      if (data.status == "authorization error") {
        setTimeout(() => {
          setToken(null);
        }, 1000);
        setPostError(data.message);
      } else if (data.status == "invalid input") {
        setPostError(data.message);
      } else if (data.status == "success") {
        setPostError(null);
        commentRef.current.value = " ";
        setComments((c) => [...comments, data.comment]);
        setNoOfComments((c) => c + 1);
      } else if (data.status == "error") {
        setPostError("Unable to post comment.");
      }
      setIsSubmitting(false);
    };

    fetchPostRequest(url, token, body, onFetch);
  };

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (fetchError != null) {
    content = <p style={{ color: "red" }}>{fetchError}</p>;
  } else if (comments.length == 0) content = <p>No Comments yet.</p>;
  else {
    content = comments.map((comment) => (
      <Comment key={comment._id} comment={comment} />
    ));
  }

  return (
    <div>
      <hr></hr>
      <h5>Comments</h5>
      <div>{content}</div>
      {!expired && (
        <InputGroup className="mt-3">
          <Form.Control
            placeholder="Add your comment"
            aria-label="Add your comment"
            ref={commentRef}
            required
            onChange={(e) => (e.target.value != "" ? setPostError(null) : null)}
          />
          <Button
            variant="outline-primary"
            onClick={addComment}
            disabled={postError}
          >
            {isSubmitting ? <Spinner size="sm" /> : "Post Comment"}
          </Button>
        </InputGroup>
      )}
      {postError && (
        <div style={{ color: "red", marginTop: "5px" }}>{postError}</div>
      )}
    </div>
  );
};
export default Comments;
