import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  // console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
        console.log("co loi");
      }
    } else {
      console.log("khong Loi~");
    }
    try {
      const res = await axios.post("/post", newPost);
    //   window.location.replace("/post/" + res.data._id);
      window.location.replace("/");
    } catch (error) {
      console.log("can't upload image !!!");
    }
  };

  return (
    <div>
      <h1>Write a post</h1>
      <div>
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <input
              id="fileInput"
              type="file"
              //   style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              type="text"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button type="submit">Publish</button>
        </form>
      </div>
    </div>
  );
}

export default Write;
