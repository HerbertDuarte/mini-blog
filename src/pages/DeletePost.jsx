import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import SinglePost from "../components/SinglePost";
import { authValue } from "../context/AuthContext";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import LoadingCircle from "../components/LoadingCircle";

const DeletePost = () => {
  // authentication
  const user = authValue();

  // states
  const [post, setPost] = useState(null);
  const [conclud, setConclud] = useState(false);

  // hooks
  const { id: postId } = useParams();
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const { deleteDocument, response, finished } = useDeleteDocument("posts");

  useEffect(() => {
    if (posts !== null) {
      const isThePost = (post) => post.id == postId;
      const foundPost = posts.find((element) => isThePost(element));
      setPost([foundPost]);
    }
  }, [posts]);

  const handleClick = () => {
    setConclud(false);
    deleteDocument(postId);
  };

  useEffect(() => {
    console.log(response);
    if (finished) {
      setConclud(true);
      console.log(finished);
    }
  }, [response]);

  return (
    <div>
      {!conclud && <h1>Want to delete this post?</h1>}
      {response.loading && <LoadingCircle />}
      {post && <SinglePost posts={post} edit={false} />}
      {conclud && (
        <span className="success">
          <p>Post deleted successfully</p>
        </span>
      )}
      {user && (
        <div className="btnDiv">
          <Link to={"/dashboard/" + user.uid}>
            <button>Back to dashboard</button>
          </Link>
          {!conclud && <button onClick={() => handleClick()} className="delete">
            Delete Post
          </button>}
        </div>
      )}
      {response.error && (
        <span className="error">
          <p>{response.error}</p>
        </span>
      )}
    </div>
  );
};

export default DeletePost;
