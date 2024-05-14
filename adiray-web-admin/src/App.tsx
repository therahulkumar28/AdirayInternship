import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateBlog from "./pages/CreateBlogPost"
import UpdateBlog from "./pages/UpdateBlogPost"
import Blog from "./pages/Blog"
import Blogpost from "./pages/BlogPost"
import Navbar from "./components/Navbar"


function App() {
 

  return (
    <>

    <BrowserRouter>
    <Navbar/>
    <Routes>
      
      <Route path="/admin/blog/" element={<Blog/>} />
      <Route path="/admin/posts/" element={<CreateBlog/>} />
      <Route path="/admin/posts/:postId" element={<UpdateBlog />} />
      <Route path="/admin/blogposts/:postId" element={<Blogpost />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
