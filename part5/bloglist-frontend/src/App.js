import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageState, setMessageState] = useState(null)
  const createBlogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogService.getAll()
      console.log(response)
      setBlogs(response)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const storageUser = window.localStorage.getItem('savedUser')
    if(storageUser) {
      setUser(JSON.parse(storageUser))
      blogService.setToken(JSON.parse(storageUser).token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username: username, password: password })
      window.localStorage.setItem('savedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
      setMessage('Successfully logged in')
      setMessageState('s')
      setTimeout(() => {
        setMessage(null)
        setMessageState(null)
      }, 3000)
    }
    catch(exception) {
      console.log(exception)
      setMessage('Username or password invalid')
      setMessageState('e')
      setTimeout(() => {
        setMessage(null)
        setMessageState(null)
      }, 3000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      setBlogs(await blogService.getAll())
      setMessage('Successfully created blog')
      setMessageState('s')
      setTimeout(() => {
        setMessage(null)
        setMessageState(null)
      }, 3000)
      createBlogFormRef.current.toggleVisibility()
    }
    catch(exception) {
      console.log(exception)
      setMessage('Error in creating blog')
      setMessageState('e')
      setTimeout(() => {
        setMessage(null)
        setMessageState(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('savedUser')
    setUser(null)
    blogService.setToken(null)
    setMessage('Successfully logged out')
    setMessageState('s')
    setTimeout(() => {
      setMessage(null)
      setMessageState(null)
    }, 3000)
  }

  const handleLike = async (toLike) => {
    try {
      await blogService.like(toLike)
      const copy = [...blogs]
      copy.forEach((obj) => {
        if(obj.id === toLike.id) {
          obj.likes+=1
        }
      })
      setBlogs(copy)
    }
    catch(exception) {
      console.log(exception)
    }

  }

  const handleDelete = async(toDelete) => {
    try {
      await blogService.destroy(toDelete.id)
      const copy = [...blogs]
      copy.splice(copy.findIndex((i) => i.id === toDelete.id),1)
      setBlogs(copy)
    }
    catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Notification message={message} messageState={messageState}/>
      {
        user !== null
          ?
          <>
            <h2>blogs</h2>
            <p>{`${user.name} logged in `}<button onClick={handleLogout}>log out</button></p>
            <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
              <CreateBlogForm createBlog={createBlog}/>
            </Togglable>
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            )}
          </>
          :
          <>
            <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>

          </>
      }


    </div>
  )
}

export default App