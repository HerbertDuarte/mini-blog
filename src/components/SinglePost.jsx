import React from 'react'
import styles from "../pages/Posts.module.css";
import { Link} from "react-router-dom";
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa'

const SinglePost = ({posts, edit}) => {

  return (
    <div>
          {posts.map((post) => {
            try {
              return (
                <div key={post.id} className={styles.card}>
                  <span translate='no' className={styles.user}>
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
                        <span translate='no' key={index}>#{tag}</span>
                      )
                  })}
                  </p>
  
                  <div className={styles.btnContainer}>
                    
                    <Link className={styles.seeMoreBtn} to={'/post/' + post.id}>
                      See more
                    </Link>
                    {edit && (
                    <>
                      <Link className={`${styles.postBtn} ${styles.trashContainer}`} to={'/post/' + post.id + '/delete'}>
                        <FaTrashAlt  className={styles.trash} />
                      </Link>
                      <Link className={`${styles.postBtn} ${styles.pencilContainer}`} to={'/post/' + post.id + '/edit'}>
                        <FaPencilAlt  className={styles.pencilIcon} />
                      </Link>
                    </>
                    )}
                  </div>
                </div>
              );
            } catch (error) {
              return
            }
            
          })}
    </div>
  )
}

export default SinglePost