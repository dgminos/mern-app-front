import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navigation from './components/Navigation'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation />
        <div className='container pages'>
          <Routes>
            <Route 
              path='/'
              element={user ? <Home /> : <Navigate to='/login' />} 
            />
            <Route 
              path='/login' 
              element={!user ? <Login /> : <Navigate to='/' />} 
            />
            <Route 
              path='/signup' 
              element={!user ? <Signup /> : <Navigate to='/' />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App