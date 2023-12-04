import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [token, setToken] = useState();
  return (
    <UserContext.Provider value={{ username, setUsername, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
