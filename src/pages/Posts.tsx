import React from "react";
import useFetchData from "../hooks/useFetchData";

function Posts() {
  const { data, fetchData } = useFetchData(
    { type: "get", route: "posts", url: "https://jsonplaceholder.typicode.com/" },
    "postsjson"
  );

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {data && <div style={{ padding: "50px", margin: "50px", background: "white" }}>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default Posts;
