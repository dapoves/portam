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
    createTarjeta(tarjeta) {
        return apiClient.post('/tarjetas', tarjeta)
    },
    getMisTarjetas(id) {
        return apiClient.get('/tarjetas/' + id)
    },
    getTarjeta(id) {
        return apiClient.get('/tarjeta/' + id)
    },
    deleteTarjeta(id) {
        return apiClient.delete('/tarjetas/' + id)
    },
    setPredeterminada(id) {
        return apiClient.put('/tarjetas/' + id + '/predeterminada')
    }
    
}
