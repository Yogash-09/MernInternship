// src/api/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
}

export const pollAPI = {
  createPoll: (pollData) => api.post('/polls', pollData),
  getPolls: (userId) => api.get('/polls', { params: { userId } }),
  getPollResults: (pollId) => api.get(`/polls/${pollId}/results`),
  updatePoll: (pollId, pollData) => api.put(`/polls/${pollId}`, pollData),
}

export const optionAPI = {
  addOption: (optionData) => api.post('/options', optionData),
  getOptions: (pollId) => api.get(`/options/${pollId}`),
  updateOption: (optionId, optionData) => api.put(`/options/${optionId}`, optionData),
  deleteOption: (optionId, userData) => api.delete(`/options/${optionId}`, { data: userData }),
}

export const voteAPI = {
  castVote: (voteData) => api.post('/votes', voteData),
  getUserVote: (pollId, userId) => api.get(`/votes/${pollId}/${userId}`),
}