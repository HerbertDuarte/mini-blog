import React, { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import LoadingCircle from "../components/LoadingCircle";

const PostDatails = () =>
  // { post }
  {
    const [post, setPost] = useState(null);
    const { id: postId } = useParams();
    const { documents: posts, loading, error } = useFetchDocuments("posts");

    useEffect(() => {
      if (posts !== null) {
        const isThePost = (post) => post.id == postId
        const foundPost = posts.find((element) => isThePost(element));
        console.log(foundPost)
        setPost(foundPost);
      }
    }, [posts]);

    console.log(post)
    return (
      <div>
        {!post ? (
          <LoadingCircle />
        ) : (
          <div className={styles.postDatailContaniner}>
            <h3 className={styles.titleDetails}>{post.title}</h3>
            <div className={styles.imageContainerFull}>
              <img
                className={styles.image}
                src={post.urlImage}
                alt={post.title}
              />
            </div>
            <p className={styles.tags}>
              {post.arrayTags.map((tag, index) => {
                return <span key={index}>#{tag}</span>;
              })}
            </p>
            <p className={styles.postBody}>{post.body}</p>
            <span className={styles.userDetails}>
              Post created By <strong>@{post.createdBy}</strong>
            </span>
          </div>
        )}
      </div>
    );
  };

export default PostDatails;
