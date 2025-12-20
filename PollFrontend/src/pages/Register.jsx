// src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../api/api'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authAPI.register(formData)
      setSuccess('Registration successful! Please login.')
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to create account. Please try again.')
    }
  }

  return (
    <div style={{
      fontFamily: 'Poppins, Inter, system-ui, sans-serif',
      background: '#0c0c0c',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '650px',
        background: '#1c1c24',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid #2a2a35',
        boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), 0 0 40px rgba(99, 102, 241, 0.15)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontWeight: '700',
          color: '#22d3ee',
          textShadow: '0 0 10px #22d3ee, 0 0 20px #6366f1'
        }}>Register</h2>
        {error && <div style={{
          color: '#f87171',
          background: 'rgba(248, 113, 113, 0.1)',
          border: '1px solid #f87171',
          boxShadow: '0 0 10px rgba(248, 113, 113, 0.4)',
          padding: '12px',
          borderRadius: '12px',
          textAlign: 'center',
          fontWeight: '500',
          marginBottom: '20px'
        }}>{error}</div>}
        {success && <div style={{
          color: '#34d399',
          background: 'rgba(52, 211, 153, 0.1)',
          border: '1px solid #34d399',
          boxShadow: '0 0 10px rgba(52, 211, 153, 0.4)',
          padding: '12px',
          borderRadius: '12px',
          textAlign: 'center',
          fontWeight: '500',
          marginBottom: '20px'
        }}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '18px',
              borderRadius: '14px',
              border: '1px solid #2a2a35',
              background: '#111',
              color: '#ffffff',
              fontSize: '15px',
              transition: 'all 0.3s ease'
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '18px',
              borderRadius: '14px',
              border: '1px solid #2a2a35',
              background: '#111',
              color: '#ffffff',
              fontSize: '15px',
              transition: 'all 0.3s ease'
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '18px',
              borderRadius: '14px',
              border: '1px solid #2a2a35',
              background: '#111',
              color: '#ffffff',
              fontSize: '15px',
              transition: 'all 0.3s ease'
            }}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '18px',
              borderRadius: '14px',
              border: '1px solid #2a2a35',
              background: '#111',
              color: '#ffffff',
              fontSize: '15px',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
              boxShadow: '0 6px 15px rgba(34, 211, 238, 0.4), 0 0 25px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Register
          </button>
        </form>
        <p style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          Already have an account? <Link 
            to="/login" 
            style={{
              color: '#22d3ee',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register