import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',

  })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)
  const [user, setUser] = useState(null) 

  useEffect(() => {
    console.log(errorMessage); // Log error message whenever it changes
  }, [errorMessage]);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  })

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
    } catch (error) {
      setErrorMessage("wrong username or password")
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

  const addBlog = (event) => {
    event.preventDefault()
     blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
          setTimeout(() => {
          setMessage(null)
           }, 5000)
        setNewBlog({
          title: '',
          author: '',
          url: '',
        })
      })
  }

  const handleInputChange = (event) => {
    const { name,value } =event.target
    setNewBlog({
      ...newBlog,
      [name]:value
    })
  }

  const BlogForm = () => (
    <form onSubmit={addBlog}>
      <div>
      title:
      <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={handleInputChange}
        />
        </div>
        <div>
      author:
      <input
      type="text"
      value={newBlog.author}
      name="author"
      onChange={handleInputChange}
        />
        </div>
        <div>
      url:
      <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={handleInputChange}
        />
        </div>
      <button type="submit">create</button>
    </form>  
  )
  

  if (user === null) {
    return (
      <div> 
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />    
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={Message}/>
      {user.name} logged in <button type="submit" onClick={handleLogout}>logout</button>
      
      <h2>create new</h2>
      {BlogForm()}
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App