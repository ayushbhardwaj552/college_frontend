import axios from "axios";
import { useEffect, useState } from "react";
import "./blogs.css";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Comments from "./Comment";

function Blogs() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const myHeaders = {
    "Content-Type": "application/json", // Adjust the content type based on your API requirements
    Authorization: `Bearer ${localStorage.token}`, // Add any other headers as needed
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://collegediaries-production-1816.up.railway.app/api/blog/${id}`,
          {
            headers: myHeaders,
          },
        );
        const bl = res.data;
        if (typeof res.data.comments != "undefined") {
          setBlog(bl.blog);
          setLoading(false);
          setAuthenticated(true);
        } else {
          setLoading(false);
          setAuthenticated(false);
          setBlog(bl.blog);
        }
      } catch (err) {
        setError(err);
      }
    };
    getBlog();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <div className="blog-loading">Loading ...</div>;
  }
  return (
    <div className="blog">
      <h1 className="blog-heading">
        {blog.heading + " " + formatDate(blog.date)}{" "}
      </h1>
      <p className="blog-text">{blog.text}</p>
      <p className="blog-author">{blog.author}</p>
      <div className="blog-comments">
        <h1 className="blog-comments-heading">COMMENTS</h1>
        <ShowComments authenticated={authenticated} id={id} />
      </div>
    </div>
  );
}

function ShowComments({ authenticated, id }) {
  if (authenticated == true) {
    return <Comments id={id} />;
  } else {
    return (
      <div className="comments-denied">Log in To post/see the comments</div>
    );
  }
}

export default Blogs;

