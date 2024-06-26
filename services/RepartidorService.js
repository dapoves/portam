import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://damian.jdfs.dev/api`,
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
    },
    cancelarEnvio(id) {
        return apiClient.post('/envios/cancelar-entrega/' + id)
    },
}