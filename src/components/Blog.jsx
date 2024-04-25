import React from "react"


const Blog = ({ blog, handleLike }) => {
  

  return(
  <div>
    {blog.title} {blog.author} {blog.likes} 
    <button onClick={()=>handleLike(blog)}>like</button>
  </div> 
  ) 
}

export default Blog