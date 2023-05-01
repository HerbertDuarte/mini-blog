import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import styles from "../pages/Posts.module.css";


const SearchBar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate("/search?query="+ query)
    }
  };

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
        <input
          className={styles.search}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search a post using a tag..."
        />
        <button className={styles.searchBtn} >Search</button>
      </form>
  )
}

export default SearchBar