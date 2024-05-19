import Swal from "sweetalert2"

// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  if (!window.localStorage.getItem('token')) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You need to login first!'
    })
  } else {
    console.log('You are logged in!')
  }
})
