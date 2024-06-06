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
    getUser(id) {
        return apiClient.get('/users/' + id)
    },
    
}
    
