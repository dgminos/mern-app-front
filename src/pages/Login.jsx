import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <Form className='login' onSubmit={handleSubmit}>
    <h3><strong>Log in</strong></h3>
    <Form.Group>
      <Form.Label><strong>Email address:</strong></Form.Label>
      <Form.Control type='email' placeholder='Enter your email address' onChange={(e) => setEmail(e.target.value)}
      value={email}
      required
       />
    </Form.Group>
    <Form.Group>
      <Form.Label><strong>Password:</strong></Form.Label>
      <Form.Control type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}
      value={password}
      required
      />
    </Form.Group>
    <Button className='mt-3 form-button' type='submit' disabled={isLoading}>
      Log in
    </Button>
    {error && <div className='error'>{error}</div>}
  </Form>
  )
}

export default Login