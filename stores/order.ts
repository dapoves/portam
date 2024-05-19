import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: '',
    stablish: '',
    subtotal: 0,
    costeEnvio: 0,
    order: {},
  }),
  actions: {
    setProducts(products: string) {
      this.products = products
    },
    setStablish(stablish: string) {
      this.stablish = stablish
    },
    setSubtotal(subtotal: number) {
      this.subtotal = subtotal
    },
    setCosteEnvio(costeEnvio: number) {
      this.costeEnvio = costeEnvio
    },
    setOrder(order: any) {
      this.order = order
    },
  }
  
})



// this.$store.dispatch('users/login', formdata)
// export const actions = {
//   fetchCoches({ commit }) {
//     return CocheService.getCoches().then(response => {
//       const coches = response.data.filter((coche) => coche.unidades > 0)
//       if (funciones.isAdmin()){
//         commit('SET_COCHES', response.data)
//       } else {
//         commit('SET_COCHES', coches)
//       }
//     })
//   },
//   fetchCoche({ commit }, id) {
//     return CocheService.getCoche(id).then(response => {
//       commit('SET_COCHE', response.data)
//     })
//   },
//   fetchMisCoches({commit}, ) {
//     return CocheService.getMisCoches().then(response => {
//       commit('SET_COCHES', response.data)
//     })
//   },
//   comprarCoche(id) {
//     return CocheService.comprarCoche(id);
//   },
//   // updateCoche(id, coche) {
//   //   console.log(id)
//   //   //return CocheService.updateCoche(id, coche);
//   // },
//   deleteCoche({dispatch}, id){
//     return CocheService.deleteCoche(id);
//   },
//   restoreCoche({dispatch}, id){
//     return CocheService.restoreCoche(id);
//   },
//   crearCoche({dispatch}, coche){
//     return CocheService.crearCoche(coche);
//   }
// }
