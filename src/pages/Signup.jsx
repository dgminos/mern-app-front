import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Form, Button } from 'react-bootstrap'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <Form className='login' onSubmit={handleSubmit}>
    <h3><strong>Sign up</strong></h3>
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
        Sign up
    </Button>
    {error && <div className='error'>{error}</div>}
  </Form>
  )
}

export default Signup