import React from "react"

const deleteButton = (blog , user, handleDelete) =>{
  if(blog.user.username === user.username){
    return(
      <button onClick={()=>{if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){handleDelete(blog)}}}>Delete</button>
    )
  }
}

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  

  return(
  <div>
    {blog.title} {blog.author} {blog.likes} 
    <button onClick={()=>handleLike(blog)}>like</button>
    {deleteButton(blog,user,handleDelete)}
  </div> 
  ) 
}

export default Blog