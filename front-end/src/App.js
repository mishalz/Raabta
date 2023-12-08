import { useContext, useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import UserContext from "./context/UserContext";

function App() {
  //if the user is logged in we show the homepage otherwise the loginpage
  const { token } = useContext(UserContext);
  let userLoggedIn = !(token == undefined || token == null);

  let content = userLoggedIn ? <Homepage /> : <Login />;
  return content;
}

export default App;
