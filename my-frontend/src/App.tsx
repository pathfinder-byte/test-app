import "./App.css";
import PostList from "./components/PostList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import PostByTag from "./components/PostByTag";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  console.log("aap");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostList />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/posts/:id" element={<PostDetail />}></Route>
          <Route path="tag/:tag" element={<PostByTag tag={""} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
