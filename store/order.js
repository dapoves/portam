export const state = () => ({
  coches: "",
  coche: {},
})


export const mutations = {
  SET_COCHES(state, coches) {
    state.coches = coches
  },
  SET_COCHE(state, coche) {
    state.coche = coche
  }
}

export const actions = {
  fetchCoches({ commit }) {
    return CocheService.getCoches().then(response => {
      const coches = response.data.filter((coche) => coche.unidades > 0)
      if (funciones.isAdmin()){
        commit('SET_COCHES', response.data)
      } else {
        commit('SET_COCHES', coches)
      }
    })
  },
  fetchCoche({ commit }, id) {
    return CocheService.getCoche(id).then(response => {
      commit('SET_COCHE', response.data)
    })
  },
  fetchMisCoches({commit}, ) {
    return CocheService.getMisCoches().then(response => {
      commit('SET_COCHES', response.data)
    })
  },
  comprarCoche(id) {
    return CocheService.comprarCoche(id);
  },
  // updateCoche(id, coche) {
  //   console.log(id)
  //   //return CocheService.updateCoche(id, coche);
  // },
  deleteCoche({dispatch}, id){
    return CocheService.deleteCoche(id);
  },
  restoreCoche({dispatch}, id){
    return CocheService.restoreCoche(id);
  },
  crearCoche({dispatch}, coche){
    return CocheService.crearCoche(coche);
  }
}
