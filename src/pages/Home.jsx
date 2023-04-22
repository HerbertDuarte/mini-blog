import React, { useEffect, useState } from "react";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import LoadingCircle from "../components/LoadingCircle";
import styles from "./Posts.module.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit");
  };

  return (
    <div className={styles.home}>
      <h1 className="pageTitle">See the new posts</h1>
      <form className={styles.postForm} onSubmit={handleSubmit}>
        <input
          className={styles.search}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search a post..."
        />
        <button className={styles.searchBtn} >Search</button>
      </form>
      <div className={styles.posts}>
        {loading && <LoadingCircle />}
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id} className={styles.card}>
                <span className={styles.user}><span className={styles.icon}><FaUserAlt className={styles.userIcon} /></span> @{post.createdBy}</span>
                <h3 className={styles.title}>
                  {post.title}
                </h3>
        
                <div className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={post.urlImage}
                    alt={post.title}
                  />
                </div>
                <p className={styles.tags}>
                {post.arrayTags.map((tag, index)=>{
                  return(
                    <span key={index} >#{tag}</span>
                  )
                })}
                </p>
                <Link className={styles.seeMoreBtn} to={'/post/' + post.id}>
                  See more
                </Link>
              </div>
            );
          })}
        {posts && posts.length === 0 && (
          <div className="error">
            <p>Not found posts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
