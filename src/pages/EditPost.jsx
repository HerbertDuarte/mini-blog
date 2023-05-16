import { useEffect, useState } from "react";
import { authValue } from "../context/AuthContext";
import LoadingCircle from "../components/LoadingCircle";
import { Link, useParams } from "react-router-dom";
import { useFetchDocument } from "../hooks/useFetchDocument";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
// import { useNavigate } from "react-router-dom";

const EditPost = () => {
  // const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");
  const [conclud, setConclud] = useState(false);
  const [links, setLinks] = useState("");

  const user = authValue();

  const { id } = useParams();
  const { document: doc, loading, fetchError } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts");

  console.log(response);

  // fetch e change input value
  useEffect(() => {
    if (doc != undefined) {
      setTitle(doc.title);
      setUrlImage(doc.urlImage);
      setBody(doc.body);
      let textBody = doc.body.join("\n");
      const textTags = doc.arrayTags.join(", ");
      if (doc.links) {
        const textLinks = doc.links.join(", ");
        setLinks(textLinks);
      }

      setBody(textBody);
      setTags(textTags);
    }
  }, [doc]);

  useEffect(() => {
    if (response.error) {
      setFormError(response.error);
    }
  }, [conclud, response]);

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setConclud(false);
    setFormError("");

    // validade image url
    try {
      new URL(urlImage);
    } catch (error) {
      setFormError("The image must be a url");
      return;
    }

    // create tags array
    const arrayTags = tags.split(",").map((tag) => {
      return tag.replace(/\s/g, "");
    });

    // create links array
    const arraylinks =
      links.length !== 0
        ? links.split(",").map((link) => link.replace(/\s/g, ""))
        : false;
    // order paragraphs
    const newBody = body.split("\n");

    const data = {
      title,
      urlImage,
      body: newBody,
      arrayTags,
      uid: user.uid,
      createdBy: user.displayName,
      links: arraylinks,
    };

    updateDocument(id, data);
    setConclud(true);
    // navigate('/dashboard/' + user.uid)
  };

  return (
    <div className="newPostContent">
      {!loading && !conclud && (
        <>
          <h2>Edit your post!</h2>
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
            <p>Image preview</p>
            <img
              id="img"
              style={{
                width: "100%",
                marginTop: "5px",
              }}
              src={urlImage}
              alt=" image preview"
            />
            <label translate="no" htmlFor="tags">
              Tags <span translate="yes">(separated by comma)</span>
            </label>
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
            <label translate="no" htmlFor="links">
              References Link <span translate="yes">(separated by comma)</span>
            </label>
            <input
              placeholder="this is not required"
              id="links"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              type="text"
            />
            {!response.loading && (
              <div className="btnDiv">
                <button className="delete">
                  <Link
                    style={{ color: "white" }}
                    to={"/dashboard/" + user.uid}
                  >
                    Cancel
                  </Link>
                </button>
                <button>Edit post</button>
              </div>
            )}
            {response.loading && <LoadingCircle />}
          </form>
        </>
      )}
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
      {fetchError && (
        <span className="error">
          <p>{fetchError}</p>
        </span>
      )}
      {conclud && (
        <>
          <span className="success">
            <p>Post edited successfully</p>
          </span>
        <div className="btnDiv">
          <Link to={"/dashboard/" + user.uid}>
            <button>Back to dashboard</button>
          </Link>
        </div>
        </>
      )}

      {loading && <LoadingCircle />}
    </div>
  );
};

export default EditPost;
