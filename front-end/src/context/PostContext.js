import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        likedPosts,
        setLikedPosts,
        dislikedPosts,
        setDislikedPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
