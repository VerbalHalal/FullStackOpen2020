import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username,setUsername,password,setPassword,handleLogin }) => {
  return(
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id='username'
            value={username}
            name='username'
            onChange={({ target }) => {setUsername(target.value)}}
          />
        </div>
        <div>
            password
          <input
            id='password'
            value={password}
            name='password'
            type='password'
            onChange={({ target }) => {setPassword(target.value)}}
          />
        </div>
        <button id='loginButton' type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm