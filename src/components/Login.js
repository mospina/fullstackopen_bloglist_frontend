import React, { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('login with', username, password)
  }  

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        <label>password</label>
        <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
      </form>
  )
}

export default Login
