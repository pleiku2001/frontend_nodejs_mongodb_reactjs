import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import { Context } from "../../context/Context";
const axios = require("axios");

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  //   console.log(user.username);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path);
      // console.log(res.data);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      window.location.replace("/post/" + path);
    } catch (err) {}
  };
  return (
    <>
      singlePost
      <p>
        {post.username === user.username && (
          <>
            <button
              onClick={() => {
                setUpdateMode(true);
              }}
            >
              Edit
            </button>
            <button onClick={handleDelete}>delete</button>
          </>
        )}
      </p>
      {updateMode ? (
        <div>
          <input
            type="text"
            value={post.title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="singlePostDescInput"
            value={post.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <p>{post.title}</p>
          <p>{post.username}</p>
          <p>
            <img
              style={{ width: 100, height: 100 }}
              src={PF + post.photo}
              alt=""
            />
          </p>
          <p> {new Date(post.createdAt).toDateString()}</p>
        </div>
      )}
    </>
  );
}

export default SinglePost;
