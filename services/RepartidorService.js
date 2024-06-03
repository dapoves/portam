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
    repartirPedido(data) {
        return apiClient.post('/pedidos/repartir', data)
    },
    getPedidoEnReparto(id) {
        return apiClient.get('/pedidos/reparto/' + id)
    },
    entregarPedido(id) {
        return apiClient.post('/pedidos/entregar/' + id)
    },
    cancelarPedido(id) {
        return apiClient.post('/pedidos/cancelar-entrega/' + id)
    },
    repartirEnvio(data) {
        return apiClient.post('/envios/repartir', data)
    },
    getEnviosEnReparto(id) {
        return apiClient.get('/envios/reparto/' + id)
    },
    recogerEnvio(id) {
        return apiClient.post('/envios/recoger/' + id)
    },
    entregarEnvio(id) {
        return apiClient.post('/envios/entregar/' + id)
    }
}