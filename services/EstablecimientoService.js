import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  withCredentials: true,
  headers: {
    Accept: 'aplication/json',
    //'Content-Type': 'application/json'
  }
})

export default {
    getCategorias() {
        return apiClient.get('/categorias')
    },
    getEstablecimientos() {
        return apiClient.get('/establecimientos')
    },
    getEstablecimiento(id) {
      return apiClient.get('/establecimientos/' + id)
    },
    getProductos(id) {
        return apiClient.get('/establecimientos/' + id + '/productos')
    },
    getPoblaciones() {
        return apiClient.get('/poblaciones')
    },
    getPoblacion(id) {
      return apiClient.get('/poblaciones/' + id)
    },
}
    