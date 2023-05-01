import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import LoadingCircle from "../components/LoadingCircle";
import styles from "./Posts.module.css";
import SinglePost from '../components/SinglePost'
// hooks
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import SearchBar from "../components/SearchBar";

const Home = () => {

  const { documents: posts, loading, error } = useFetchDocuments("posts");

  return (
    <div className={styles.home}>
      <h1 className="pageTitle">See the new posts</h1>
      <SearchBar/>
      <div className={styles.posts}>
        {loading && <LoadingCircle />}
        {error && (
          <div className="error">
            <p>Not found posts</p>
          </div>
        )}
        {posts && <SinglePost posts={posts}/>}
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
