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
    createPedido(pedido) {
        return apiClient.post('/pedidos', pedido)
    },
    addProduto(pedidoProducto) {
        return apiClient.post(`/pedido/productos`, pedidoProducto)
    },
    getMisPedidos(id) {
        return apiClient.get('/pedidos/mis-pedidos/' + id)
    },
}