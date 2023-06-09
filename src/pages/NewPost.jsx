import React, { useEffect, useState } from "react";
import { authValue } from "../context/AuthContext";
import { useInsertDocument } from "../hooks/useInsertDocument";
import LoadingCircle from "../components/LoadingCircle";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");
  const [conclud, setConclud] = useState(false);
  const [links, setLinks] = useState('')

  const { insertDocument, response, finished} = useInsertDocument("posts");

  const user = authValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setConclud(false);
    setFormError("");

    // validade image url
    try {
      new URL(urlImage);
    } catch (error) {
      setFormError("The image must be a url");
      return
    }

    // create tags array
    const arrayTags = tags.split(',').map((tag)=>{
      return (tag.replace(/\s/g, ''))
    })

    // create links array
    console.log(links)
    const arraylinks = links.length !== 0 ? links.split(',').map((link)=>(link.replace(/\s/g, ''))) : false
    // order paragraphs
    const newBody = (body.split("\n"))

    const post = {
      title,
      urlImage,
      body : newBody,
      arrayTags,
      uid: user.uid,
      createdBy: user.displayName,
      links: arraylinks
    };

    insertDocument(post);
  };
  useEffect(() => {
    console.log(response);
    if (finished) {
      setTitle("");
      setBody("");
      setTags("");
      setUrlImage("");
      setLinks("");
      setConclud(true);
      console.log(finished)
    }
  }, [response]);

  return (
    <div className="newPostContent">
      <h2>Share something with us!</h2>
      <form onSubmit={handleSubmit} className="newPostForm">
        <label htmlFor="title">Title</label>
        <input
          required
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <label htmlFor="image">Url Image</label>
        <input
          required
          id="image"
          value={urlImage}
          onChange={(e) => setUrlImage(e.target.value)}
          type="text"
        />
        <label translate="no" htmlFor="tags">Tags <span translate="yes">(separated by comma)</span></label>
        <input
          required
          id="tags"
          placeholder="Ex.: current, news, technology"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          type="text"
        />
        <label htmlFor="body">Contents</label>
        <textarea
          required
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        ></textarea>
        <label translate="no" htmlFor="links">References Link <span translate="yes">(separated by comma)</span></label>
        <input
          placeholder="this is not required" 
          id="links"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          type="text"
        />
        {!response.loading && (
          <div className="btnDiv">
            <button>Create Post</button>
          </div>
        )}
        {response.loading && <LoadingCircle />}
      </form>
      {response.error && (
        <span className="error">
          <p>{response.error}</p>
        </span>
      )}
      {formError && (
        <span className="error">
          <p>{formError}</p>
        </span>
      )}
      {conclud && (
        <span className="success">
          <p>Post created successfully</p>
        </span>
      )}
    </div>
  );
};

export default NewPost;
