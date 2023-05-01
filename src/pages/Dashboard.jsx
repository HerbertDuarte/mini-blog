import React from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";
import styles from "./Posts.module.css";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import SinglePost from "../components/SinglePost";
import { authValue } from "../context/AuthContext";
import {FaUser, FaSignOutAlt} from "react-icons/fa"
import LoadingCircle from '../components/LoadingCircle'

const Dashboard = () => {
  const { logout } = useAuthentication();
  const user = authValue();
  console.log(user)
  const uid = user.uid;
  const { documents: posts, loading, error } = useFetchDocuments("posts", null, uid);

  return (
    <div className={styles.container}>
      <div className={styles.cardUser}>
        <div className={styles.userLogoContainer}><FaUser className={styles.icon}/></div>
        <div className={styles.userInfos}>
          <span>
            <p className={styles.userName}>{user.displayName}</p>
          </span>
          <span>
            <p className={styles.email}>{user.email}</p>
          </span>
        </div>
      </div>

      <div>
        <div className={styles.posts}>
        <h2 className={styles.subtitle}>My posts </h2>
          {loading && <LoadingCircle/>}
          {posts && <SinglePost posts={posts} edit={true} />}
          {posts && posts.length === 0 && (
            <div className="error">
              <p>Not found posts</p>
            </div>
          )}
        </div>
      </div>

      <div className="logoutDiv">
        <Link to="/login/">
          <button onClick={logout}><span>Logout  </span><span><FaSignOutAlt style={{transform: 'translateY(3px)'}}/></span></button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
