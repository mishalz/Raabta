import { useState } from "react";
import PostForm from "./PostForm";
import Posts from "./Posts";

const Homepage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PostForm />
      <Posts />
    </div>
  );
};

export default Homepage;
