// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navStyle = {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '5px',
  }

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    marginRight: '15px'
  }

  const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  }

  return (
    
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: 'bold', fontSize: '18px' }}>
          Polling System
        </Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>
              Welcome, {user.name} ({user.role})
            </span>
            
            {user.role === 'ADMIN' ? (
              <>
                <Link to="/admin" style={linkStyle}>Dashboard</Link>
                <Link to="/admin/create-poll" style={linkStyle}>Create Poll</Link>
              </>
            ) : (
              <Link to="/polls" style={linkStyle}>Polls</Link>
            )}
            
            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== '/login' && (
              <Link to="/login" style={linkStyle}>Login</Link>
            )}
            {location.pathname !== '/register' && (
              <Link to="/register" style={linkStyle}>Register</Link>
            )}
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar