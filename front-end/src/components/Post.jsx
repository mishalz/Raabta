import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import { TbHealthRecognition } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { GrTechnology } from "react-icons/gr";
import { FaCircle } from "react-icons/fa6";

import getTimeDifference from "../helper/getTimeDifference";
import Comments from "./Comments";
import UserContext from "../context/UserContext";
import PostContext from "../context/PostContext";
import fetchPostRequest from "../helper/fetchPostRequest";

const Post = ({ post }) => {
  const { token, setToken } = useContext(UserContext);
  const { likedPosts, setLikedPosts, dislikedPosts, setDislikedPosts } =
    useContext(PostContext);

  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState();
  const [noOfLikes, setNoOfLikes] = useState(post.likes.length);
  const [noOfDislikes, setNoOfDislikes] = useState(post.dislikes.length);
  const [noOfComments, setNoOfComments] = useState(post.comments.length);

  let liked = likedPosts.some((p) => p._id == post._id);
  let disliked = dislikedPosts.some((p) => p._id == post._id);

  let timeRemaining = getTimeDifference(post.expiration, true);
  let expired = timeRemaining === "";
  let postDate = new Date(post.createdAt);

  let topicIcons = {
    health: <TbHealthRecognition />,
    sports: <MdOutlineSportsSoccer />,
    tech: <GrTechnology />,
    politics: <IoIosPeople />,
  };
  let topicColours = {
    health: "blue",
    tech: "purple",
    sports: "orange",
    politics: "green",
  };

  const addLike = () => {
    const onFetch = (data) => {
      if (data.status == "authorization error") {
        setTimeout(() => {
          setToken(null);
        }, 1000);
        setError(data.message);
      } else if (data.status == "success") {
        setNoOfLikes(data.likes);
        setNoOfDislikes(data.dislikes);
        setDislikedPosts(data.dislikedPosts);
        setLikedPosts(data.likedPosts);
      } else if (data.status == "failed") {
        setError(data.message);
      } else if (data.status == "error") {
        setError(`Unable to like post`);
      }
    };
    const url = `/posts/${post._id}/like`;
    fetchPostRequest(url, token, {}, onFetch);
  };

  const addDislike = () => {
    const onFetch = (data) => {
      if (data.status == "authorization error") {
        setTimeout(() => {
          setToken(null);
        }, 1000);
        setError(data.message);
      } else if (data.status == "success") {
        setNoOfLikes(data.likes);
        setNoOfDislikes(data.dislikes);
        setDislikedPosts(data.dislikedPosts);
        setLikedPosts(data.likedPosts);
      } else if (data.status == "failed") {
        setError(data.message);
      } else if (data.status == "error") {
        setError(`Unable to dislike post`);
      }
    };
    const url = `/posts/${post._id}/dislike`;
    fetchPostRequest(url, token, {}, onFetch);
  };

  return (
    <Row className="mb-3">
      <Card border="secondary">
        <Card.Header>
          <Row>
            <Col>
              <img
                src="https://i.pinimg.com/736x/1e/94/7d/1e947dfcaad552afa209bceebbfac47b.jpg"
                className="rounded-circle me-2"
                alt=""
                width="25"
              />
              {post.author.username}
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              {!expired && (
                <>
                  <FaCircle
                    style={{
                      fontSize: "10px",
                      marginRight: "5px",
                      color: "green",
                    }}
                  />
                  <span>Live</span>
                </>
              )}
            </Col>
          </Row>
          <Row className="mt-3 text-muted">
            <Col className="text-muted" sm="auto">
              Topics:{" "}
            </Col>
            <Col>
              {post.topic.map((topic) => (
                <span
                  key={topic}
                  style={{
                    color: `${topicColours[topic]}`,
                    marginRight: "20px",
                  }}
                >
                  {topic} {topicIcons[topic]}
                </span>
              ))}
            </Col>
            <Col style={{ textAlign: "right" }}>
              Posted at: {postDate.getDate()}.{postDate.getMonth() + 1}.
              {postDate.getFullYear()}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.message}</Card.Text>
          <Row>
            <Col md="auto" style={{ display: "flex", alignItems: "center" }}>
              {liked ? (
                <Button variant="primary">
                  <AiFillLike
                    style={{
                      fontSize: "20",
                      marginRight: "5px",
                      color: "white",
                    }}
                  />
                  <Badge bg="light" text="dark">
                    {noOfLikes}
                  </Badge>
                </Button>
              ) : (
                <Button variant="light" disabled={expired} onClick={addLike}>
                  <AiOutlineLike
                    style={{ fontSize: "20", marginRight: "5px" }}
                    onClick={addLike}
                  />
                  <Badge bg="secondary">{noOfLikes}</Badge>
                </Button>
              )}
            </Col>
            <Col style={{ display: "flex", alignItems: "center" }}>
              {disliked ? (
                <Button variant="primary">
                  <AiFillDislike
                    style={{
                      fontSize: "20",
                      marginRight: "5px",
                      color: "white",
                    }}
                  />
                  <Badge bg="light" text="dark">
                    {noOfDislikes}
                  </Badge>
                </Button>
              ) : (
                <Button variant="light" onClick={addDislike} disabled={expired}>
                  <AiOutlineDislike
                    style={{ fontSize: "20", marginRight: "5px" }}
                  />
                  <Badge bg="secondary">{noOfDislikes}</Badge>
                </Button>
              )}
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {!showComments && (
                <Button variant="light" onClick={() => setShowComments(true)}>
                  Show Comments <Badge bg="secondary">{noOfComments}</Badge>
                </Button>
              )}
              {showComments && (
                <Button
                  variant="primary"
                  onClick={() => setShowComments(false)}
                >
                  Hide Comments <Badge bg="secondary">{noOfComments}</Badge>
                </Button>
              )}
            </Col>
          </Row>
          {error && <Row style={{ color: "red" }}>{error}</Row>}
          {showComments && (
            <Comments
              postid={post._id}
              setNoOfComments={setNoOfComments}
              expired={expired}
            />
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          <Row>
            <Col sm="7">
              {timeRemaining === ""
                ? "Post Expired"
                : `Expires in ${timeRemaining}`}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Row>
  );
};
export default Post;
