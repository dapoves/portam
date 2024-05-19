import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  withCredentials: true,
  headers: {
    Accept: 'aplication/json',
    'Content-Type': 'multipart/form-data'
    
  }
})

export default {
    login(usuario) {
        return apiClient.post('/login', usuario)
    },
    logout() {
        return apiClient.post('/logout')
    },
    register(usuario) {
        return apiClient.post('/register', usuario)
    },
    isAuthenticated() {
        return apiClient.get('/user')
    }
}
    
