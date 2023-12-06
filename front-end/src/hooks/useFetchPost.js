import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const useFetchPost = (url, body, onFetchingData) => {
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();

  setIsLoading(true);
  fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      onFetchingData(data);
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
  return { isLoading };
};

export default useFetchPost;
