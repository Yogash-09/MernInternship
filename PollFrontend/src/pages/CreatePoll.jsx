// src/pages/CreatePoll.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pollAPI, optionAPI } from '../api/api'

function CreatePoll() {
  const [pollData, setPollData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  })
  const [options, setOptions] = useState(['', ''])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handlePollChange = (e) => {
    setPollData({
      ...pollData,
      [e.target.name]: e.target.value
    })
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, ''])
  }

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index)
      setOptions(newOptions)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'ADMIN') {
      navigate('/login')
      return
    }

    const validOptions = options.filter(option => option.trim() !== '')
    if (validOptions.length < 2) {
      setError('Please provide at least 2 options')
      return
    }

    try {
      const pollResponse = await pollAPI.createPoll({
        ...pollData,
        createdBy: user.id
      })

      const pollId = pollResponse.data.poll._id

      for (const option of validOptions) {
        await optionAPI.addOption({
          pollId,
          text: option,
          userId: user.id
        })
      }

      setSuccess('Poll created successfully!')
      setTimeout(() => navigate('/admin'), 2000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create poll')
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
        }}>Create New Poll</h2>
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
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#a1a1aa' }}>Title:</label>
            <input
              type="text"
              name="title"
              value={pollData.title}
              onChange={handlePollChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid #2a2a35',
                background: '#111',
                color: '#ffffff',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#a1a1aa' }}>Description:</label>
            <textarea
              name="description"
              value={pollData.description}
              onChange={handlePollChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid #2a2a35',
                background: '#111',
                color: '#ffffff',
                fontSize: '15px',
                height: '80px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#a1a1aa' }}>Start Date:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={pollData.startDate}
              onChange={handlePollChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid #2a2a35',
                background: '#111',
                color: '#ffffff',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#a1a1aa' }}>End Date:</label>
            <input
              type="datetime-local"
              name="endDate"
              value={pollData.endDate}
              onChange={handlePollChange}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid #2a2a35',
                background: '#111',
                color: '#ffffff',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#a1a1aa' }}>Options:</label>
            {options.map((option, index) => (
              <div key={index} style={{ display: 'flex', marginBottom: '10px', gap: '10px' }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: '1px solid #2a2a35',
                    background: '#111',
                    color: '#ffffff',
                    fontSize: '15px',
                    transition: 'all 0.3s ease'
                  }}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    style={{
                      padding: '14px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      borderRadius: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#fff',
                      background: 'linear-gradient(135deg, #f87171, #ff8a80)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '25px',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                marginTop: '10px',
                transition: 'all 0.3s ease'
              }}
            >
              Add Option
            </button>
          </div>

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
            Create Poll
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePoll