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
            <article className={styles.postBody}>
              {post.body.map((paragraph, index)=>(
                <p className={styles.paragraph} key={index}>{paragraph}</p>
              ))}
            </article>
            <span className={styles.userDetails}>
              Post created By <strong>@{post.createdBy}</strong>
            </span>
            {post.links && (
            <>
              <hr />
              <aside className={styles.linksContainer}>
                <span>References:</span>
              {post.links.map((link, index) => {
                  return <p><a className="link" target="_blank" href={link} key={link}>{link}</a></p>
                })}
              </aside>
            </>
            )}
          </div>
        )}
      </div>
    );
  };

export default PostDatails;
