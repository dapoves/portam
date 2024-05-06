import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  withCredentials: true,
  headers: {
    Accept: 'aplication/json',
    //'Content-Type': 'application/json'
  }
})

export default{
  getCoches() {
    return apiClient.get('/coches')
  },
  getCoche(id) {
    return apiClient.get('/coches/' + id)
  },
  getMisCoches() {
    return apiClient.get('/miscoches/')
  },
  comprarCoche(id) {
    return apiClient.get('/coches/' + id + '/comprar')
  },
  updateCoche(id, coche) {
    return apiClient.post('/coches/' + id, coche)
  },
  deleteCoche(id) {
    return apiClient.delete('/coches/' + id)
  },
  restoreCoche(id) {
    return apiClient.get('coches/' + id + '/restore')
  },
  crearCoche(coche) {
    return apiClient.post('/coches', coche)
  }
}
