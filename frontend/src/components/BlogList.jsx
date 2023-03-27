import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogList = (props) => {  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const postIdHandler = (id) => {
    props.setId(id);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  },);

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Entry Blogs</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <Link onClick={postIdHandler} key={item.id} to={`/blog/${item.id}`}>{item.title}</Link>
            <p>
              Author: {item.author}, Created At: {item.created_at}
            </p>
            <p>
              {item.body.split(" ").slice(0, 5).join(" ")}
              {item.body.split(" ").length > 5 && "..."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
