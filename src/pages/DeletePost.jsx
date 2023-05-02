import React, {useState, useEffect} from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import SinglePost from '../components/SinglePost';
import { authValue } from '../context/AuthContext';

const DeletePost = () => {

    const user = authValue()
    const [post, setPost] = useState(null);
    const { id: postId } = useParams();
    const { documents: posts, loading, error } = useFetchDocuments("posts");

    useEffect(() => {
      if (posts !== null) {
        const isThePost = (post) => post.id == postId
        const foundPost = posts.find((element) => isThePost(element));
        setPost([foundPost]);

      }
    }, [posts]);

  return (
    <div>
      <h1>Want to delete this post?</h1>
      { post && <SinglePost posts={post} edit={false}/>}
      {user && <div className="btnDiv">
        <Link to={"/dashboard/" + user.uid}>
          <button>To Go Back</button></Link>
        <button className='delete'>Delete Post</button>
      </div>}
    </div>
  )
}

export default DeletePost