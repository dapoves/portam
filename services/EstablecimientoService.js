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
    getPedidos(id) {
        return apiClient.get('/establecimientos/' + id + '/pedidos')
    },
    getPedidosPendientes(id) {
        return apiClient.get('/establecimientos/' + id + '/pedidos/pendientes')
    },
    aceptarPedido(id) {
        return apiClient.post('/pedidos/aceptar/' + id)
    },
    rechazarPedido(id) {
        return apiClient.post('/pedidos/rechazar/' + id)
    },
    getPedidosAceptados(id) {
        return apiClient.get('/establecimientos/' + id + '/pedidos/aceptados')
    },
    setOnTheWay(id) {
        return apiClient.post('/pedidos/on-the-way/' + id)
    },
    updateEstablecimiento(id, data) {
        return apiClient.post('/establecimientos/' + id, data)
    },
    updateProducto(id, data) {
        return apiClient.post('/productos/' + id, data)
    },
    createProducto(data) {
        return apiClient.post('/productos', data)
    },
    deleteProducto(id) {
        return apiClient.delete('/productos/' + id)
    },
}
    