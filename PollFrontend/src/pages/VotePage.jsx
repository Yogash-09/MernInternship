// src/pages/VotePage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pollAPI, optionAPI, voteAPI } from '../api/api'

function VotePage() {
  const { pollId } = useParams()
  const [poll, setPoll] = useState(null)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'USER') {
      navigate('/login')
      return
    }

    fetchPollData()
  }, [pollId, navigate])

  const fetchPollData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const [pollResponse, optionsResponse] = await Promise.all([
        pollAPI.getPolls(user.id),
        optionAPI.getOptions(pollId)
      ])

      const currentPoll = pollResponse.data.polls.find(p => p._id === pollId)
      if (!currentPoll) {
        setError('Poll not found or not active')
        return
      }

      setPoll(currentPoll)
      setOptions(optionsResponse.data.options)
    } catch (error) {
      setError('Error loading poll data')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async () => {
    if (!selectedOption) {
      setError('Please select an option')
      return
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      await voteAPI.castVote({
        pollId,
        optionId: selectedOption,
        userId: user.id
      })

      navigate(`/results/${pollId}`)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cast vote')
    }
  }

  if (loading) return <div style={{
    fontFamily: 'Poppins, Inter, system-ui, sans-serif',
    background: '#0c0c0c',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>Loading...</div>

  if (error) {
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
          background: '#1c1c24',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #2a2a35',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), 0 0 40px rgba(99, 102, 241, 0.15)'
        }}>
          <div style={{
            color: '#f87171',
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid #f87171',
            boxShadow: '0 0 10px rgba(248, 113, 113, 0.4)',
            padding: '12px',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: '500',
            marginBottom: '20px'
          }}>{error}</div>
          <button 
            onClick={() => navigate('/polls')} 
            style={{
              padding: '12px 24px',
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
            Back to Polls
          </button>
        </div>
      </div>
    )
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
          marginBottom: '20px',
          fontWeight: '700',
          color: '#22d3ee',
          textShadow: '0 0 10px #22d3ee, 0 0 20px #6366f1'
        }}>{poll.title}</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '10px', textAlign: 'center' }}>{poll.description}</p>
        <p style={{ color: '#ffffff', marginBottom: '30px', textAlign: 'center' }}><strong>Ends:</strong> {new Date(poll.endDate).toLocaleString()}</p>

        <div>
          <h3 style={{ color: '#22d3ee', marginBottom: '20px' }}>Select your choice:</h3>
          {options.map((option) => (
            <div key={option._id} style={{
              background: '#111',
              padding: '14px 16px',
              borderRadius: '14px',
              border: selectedOption === option._id ? '1px solid #22d3ee' : '1px solid #2a2a35',
              marginBottom: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: selectedOption === option._id ? '0 0 12px rgba(34, 211, 238, 0.5)' : 'none'
            }}>
              <input
                type="radio"
                name="option"
                value={option._id}
                checked={selectedOption === option._id}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{ 
                  margin: 0,
                  accentColor: '#22d3ee'
                }}
              />
              <label style={{ color: '#ffffff', cursor: 'pointer', flex: 1 }}>
                {option.text}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleVote}
          disabled={!selectedOption}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '50px',
            border: 'none',
            cursor: selectedOption ? 'pointer' : 'not-allowed',
            color: '#fff',
            background: selectedOption 
              ? 'linear-gradient(135deg, #22d3ee, #6366f1)' 
              : '#4a4a4a',
            boxShadow: selectedOption 
              ? '0 6px 15px rgba(34, 211, 238, 0.4), 0 0 25px rgba(99, 102, 241, 0.3)' 
              : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          Submit Vote
        </button>
      </div>
    </div>
  )
}

export default VotePage