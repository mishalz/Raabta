const fetchGetRequest = (url, token, onFetch, sortBy = "createdAt") => {
  fetch(url, {
    headers: {
      "auth-token": token,
      "sort-by": sortBy,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      onFetch(data);
    })
    .catch((err) => console.log(err));
};
export default fetchGetRequest;
