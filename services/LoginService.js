import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://damian.jdfs.dev/api`,
  withCredentials: true,
  headers: {
    Accept: 'aplication/json',
    'Content-Type': 'application/json'
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
    
