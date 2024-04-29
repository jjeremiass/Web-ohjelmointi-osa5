import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("Fetching blogs...")
    blogService
      .getAll()
      .then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLike = (blogObject) => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
    blogService
    .update(blogObject.id,updatedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog =>
        blog.id === returnedBlog.id ? returnedBlog : blog
      ))})
  }

  const handleDelete = (blogObject) => {
    blogService
    .remove(blogObject.id) 
    .then(()=>{
      setBlogs(blogs.filter(blog => blog.id != blogObject.id ))
  })}

  
  const addBlog = (blogObject) => {
      blogService
      .create(blogObject)
      .then(returnedBlog => {

      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
        setMessage(null)
          }, 5000)
      })
  }

  const loginForm = () => {
    return (
      <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </div>
    )
  }
  
    return (
      <div> 

  {!user && loginForm()}
  {user && <div>
  <h2>blogs</h2>
  <Notification message={errorMessage}/>
  <Notification message={Message}/>
  <p>{user.name} logged in </p><button type="submit" onClick={handleLogout}>logout</button>
  <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={addBlog}/>
  </Togglable>
  <div>
  {blogs
    .sort((a,b)=>b.likes - a.likes)
    .map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
      )}
  </div>
  </div>
}
</div>
    )}


export default App