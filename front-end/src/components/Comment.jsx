import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import getTimeDifference from "../helper/getTimeDifference";

const Comment = ({ comment }) => {
  //get the time that has passed since the comment was made
  const timePassed = getTimeDifference(comment.datePosted, false);

  //UI
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
