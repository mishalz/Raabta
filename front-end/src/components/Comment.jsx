import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import getTimeDifference from "../helper/getTimeDifference";

const Comment = ({ comment }) => {
  const timePassed = getTimeDifference(comment.datePosted, false);
  return (
    <Row>
      <hr></hr>
      <Col>
        <span style={{ fontWeight: "bold" }}>{comment.author.username}:</span>{" "}
        <span>{comment.body}</span>
      </Col>
      <Col className="mb-3" style={{ textAlign: "right" }}>
        <span>Posted {timePassed} ago</span>
      </Col>
    </Row>
  );
};
export default Comment;
