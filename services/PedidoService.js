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
    createPedido(pedido) {
        return apiClient.post('/pedidos', pedido)
    },
    addProduto(pedidoProducto) {
        return apiClient.post(`/pedido/productos`, pedidoProducto)
    },
    getPedidos() {
        return apiClient.get('/pedidos')
    },
    getMisPedidos(id) {
        return apiClient.get('/pedidos/mis-pedidos/' + id)
    },
    getPedido(id) {
        return apiClient.get('/pedidos/' + id)
    },
    getProductosPedido(id) {
        return apiClient.get('/pedido/' + id + '/productos')
    },
}