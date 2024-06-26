export default defineNuxtRouteMiddleware((to, from) => {
  
    const excludedRoutes = ['login', 'register'];

  if (typeof window !== 'undefined') {
    if (!excludedRoutes.includes(to.name) && localStorage.getItem('user_id') === null) {
      return navigateTo('/login')
    }
  }
})
