import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbHealthRecognition } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { GrTechnology } from "react-icons/gr";

import getTimeDifference from "../helper/getTimeDifference";

const Post = ({ post }) => {
  let timeRemaining = getTimeDifference(post.expiration, true);
  let expirationDate = new Date(post.expiration);
  let postDate = new Date(post.createdAt);
  let numberOfLikes = post.likes.length;
  if (numberOfLikes > 0) {
  }
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

  const addLike = () => {};
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
            <Col style={{ textAlign: "right" }}>
              Posted at: {postDate.getDate()}.{postDate.getMonth() + 1}.
              {postDate.getFullYear()}
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
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.message}</Card.Text>
          <div>
            <FaRegHeart onClick={addLike} /> {numberOfLikes}
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Row>
            <Col sm="7">
              {timeRemaining === ""
                ? "Post Expired"
                : `Expires in ${timeRemaining}`}
            </Col>
            <Col style={{ textAlign: "right" }}>
              Expiration Date: {expirationDate.getDate()}.
              {expirationDate.getMonth() + 1}.{expirationDate.getFullYear()}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Row>
  );
};
export default Post;
