import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

const useFetchGet = (url, onFetchingData) => {
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      headers: {
        "auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        onFetchingData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { isLoading };
};

export default useFetchGet;
