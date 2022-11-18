import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Container } from 'react-bootstrap'

const Navigation = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <Container className="container">
        <Link to="/">
          <h1><strong>Tasks manager</strong></h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login"><strong>Login</strong></Link>
              <Link to="/signup"><strong>Signup</strong></Link>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Navigation