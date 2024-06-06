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
    getEnvios() {
        return apiClient.get('/envios')
    },
    getEnvio(id) {
        return apiClient.get('/envios/' + id)
    },
    getMisEnvios(id) {
        return apiClient.get('/envios/mis-envios/' + id)
    },
    createEnvio(envio) {
        return apiClient.post('/envios', envio)
    },
}
