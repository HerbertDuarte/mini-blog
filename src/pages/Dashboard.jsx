import React from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import SinglePost from "../components/SinglePost";
import { authValue } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuthentication();
  const user = authValue();
  const uid = user.uid;
  const { documents: posts, loading, error } = useFetchDocuments("posts", null, uid);

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h2 style={{textAlign : 'start'}}>My posts </h2>

        <div className={styles.posts}>
          {posts && <SinglePost posts={posts} />}
          {posts && posts.length === 0 && (
            <div className="error">
              <p>Not found posts</p>
            </div>
          )}
        </div>
      </div>

      <div className="btnDiv">
        <Link to="/login/">
          <button onClick={logout}>Exit</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
