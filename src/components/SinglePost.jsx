import React from 'react'
import styles from "../pages/Posts.module.css";
import { Link, useNavigate } from "react-router-dom";

const SinglePost = ({posts}) => {
  return (
    <div>
          {posts.map((post) => {
            return (
              <div key={post.id} className={styles.card}>
                <span className={styles.user}>
                  {/* <span className={styles.icon}><FaUserAlt className={styles.userIcon} />
                </span>  */}
                @{post.createdBy}</span>
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
    </div>
  )
}

export default SinglePost