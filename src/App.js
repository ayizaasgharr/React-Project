import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./component/login/Login";
import SignUp from "./component/signup/SignUp";
import Posts from "./component/posts/Posts";
import CreatePost from "./component/posts/CreatePost";
import EditPost from "./component/posts/EditPost";
import Comments from "./component/posts/comments/Comments";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/posts/:id/create-post" element={<CreatePost />} />
        <Route path="/posts/:id/edit-post" element={<EditPost />} />
        <Route path="/posts/comments/:userid/:postid" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
