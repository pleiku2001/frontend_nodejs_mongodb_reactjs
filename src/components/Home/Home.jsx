import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
const axios = require("axios");
function Home() {
  const { user, dispatch } = useContext(Context);
  const [post, setPost] = useState([]);
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    axios
      .get("/post")
      .then(function (response) {
        setPost(response.data);
      })
      .catch(function (error) {});
  }, []);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  // console.log(user);
  return (
    <>
      <span>
        <h1>HOME</h1>
      </span>
      {user && (
        <>
          <div onClick={handleLogout}>
            <Link to="/" className="link">
              LOGOUT
            </Link>
          </div>
          <p>
            <Link to="/write"> Write a post </Link>
          </p>
        </>
      )}

      <div>{user ? <p>setting </p> : <Link to="/login">Sign in</Link>}</div>
      <>
        {post.map((e) => (
          <div key={e._id}>
            <p>
              {e.photo && (
                <img
                  style={{ width: 100, height: 100 }}
                  src={PF + e.photo}
                  alt=""
                />
              )}
            </p>
            <p>title: {e.title}</p>
            <p>content: {e.desc}</p>
            <p>author: {e.username}</p>
            <Link to={`/post/${e._id}`}>
              <button>{e._id}</button>
            </Link>
          </div>
        ))}
      </>
    </>
  );
}

export default Home;
