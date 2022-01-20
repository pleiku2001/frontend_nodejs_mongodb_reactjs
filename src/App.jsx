import { Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";
import "./App.css";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Signup/Register";
import Write from "./components/Write/Write";
import SinglePost from "./components/SinglePost/SinglePost";


function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <Routes>
        
          <Route index element={<Home />} />
          <Route path="/about" element={user ? <Home /> : <About/>} />
          <Route path="/login" element={user ? <Home />: <Login/>} />
          <Route path="/register" element={user ? <Home/> : <Register/>} />
          <Route path="/write" element={user ? <Write/> : <Home/>} />
          <Route path="/post/:id" element={ <SinglePost/> } />

      </Routes>
    </div>
  );
}
export default App;
