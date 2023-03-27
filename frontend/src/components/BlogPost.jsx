import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const BlogPost = (props) => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/api/v1/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong while fetching the data");
        }
        return response.json();
      })
      .then((data) => {
        setBlogPost(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <p>Oops! {error}</p>;
  }

  if (!blogPost) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.body}...</p>
      <p>
        <em>By Author {blogPost.author}</em>
      </p>
      <p>
        <em>Created on {new Date(blogPost.created_at).toLocaleDateString()}</em>
      </p>
    </div>
  );
};

export default BlogPost;
