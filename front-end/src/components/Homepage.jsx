import { useContext, useState } from "react";
import PostForm from "./PostForm";
import Posts from "./Posts";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import UserContext from "../context/UserContext";

const Homepage = () => {
  const { setToken, username } = useContext(UserContext);
  return (
    <Row style={{ padding: "10px" }}>
      <Col sm={2} md={3} style={{ paddingLeft: "10px" }}>
        <h4>User Profile</h4>
        <img
          src="https://i.pinimg.com/736x/1e/94/7d/1e947dfcaad552afa209bceebbfac47b.jpg"
          className="rounded-circle me-2"
          alt=""
          width="40"
        />
        <span>{username}</span>
      </Col>
      <Col sm={8} md={6}>
        <PostForm />
        <Posts />
      </Col>
      <Col sm={2} md={3} style={{ textAlign: "right", paddingRight: "10px" }}>
        <Button variant="secondary" onClick={() => setToken(null)}>
          Logout
        </Button>
      </Col>
    </Row>
  );
};

export default Homepage;
