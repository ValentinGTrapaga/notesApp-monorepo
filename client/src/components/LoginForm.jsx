export const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            type='text'
            value={username}
            id='username'
            name='Username'
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </label>
        <button
          type='submit'
          id='login-button'>
          login
        </button>
      </form>
    </>
  )
}
