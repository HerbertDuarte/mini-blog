import React from "react";

import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useQuery } from "../hooks/useQuery";
import SinglePost from "../components/SinglePost";
import styles from "./Posts.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("query");

  const { documents: posts, loading, error } = useFetchDocuments("posts", search);
  console.log(posts);
  return (
    <>
      <h2>Resultados para : {search}</h2>
      <div className={styles.posts}>
        {posts && <SinglePost posts={posts} />}
        {posts && posts.length === 0 && (
          <div className="error">
            <p>Not found posts</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
