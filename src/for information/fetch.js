import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
console.log(post);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/forms?slug=${slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  return (
    <div>
      {/* <Link to={`${slug}`}><button>adjlajldk</button></Link> */}
      {post ? (
        <>
          <h1 className="text-light">{post.title}</h1>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Post;
