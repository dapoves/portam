<template>
    <div>
      <!-- <loginHeader /> -->
      <div class="titulo font-extrabold text-2xl font-noto-sans mx-auto mt-10 text-center">
        <h1>Porta'm</h1>
        <h1 class="primary_color">Delivery</h1>
      </div>
      <form @submit.prevent="login" class="flex flex-col w-full h-full pb-6 rounded-3xl">
        <h3 class="mb-12 text-4xl font-extrabold text-dark-grey-900 text-center">Iniciar Sesión</h3>
        <label for="email" class="mb-2 text-sm text-start text-grey-900">Email</label>
        <input id="email" v-model="email" type="email" placeholder="mail@portam.com"
          class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-2 placeholder:text-grey-700 bg-slate-100 text-dark-zinc-900 rounded-2xl" />
        <p v-if="email.length > 0 && !validarEmail(email)" class="text-red-500 text-xs">Añade un correo válido</p>
        
        <label for="password" class="mb-2 mt-5 text-sm text-start text-grey-900">Contraseña</label>
        <input id="password" v-model="password" type="password" placeholder="Ingresa tu contraseña"
          class="flex items-center w-full px-5 py-4 mb-2 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
        <p v-if="password.length > 0 && !validarPassword(password)" class="text-red-500 text-xs">La contraseña debe tener al menos 3 digitos</p>

        <button class="w-full px-6 py-4 mx-auto mb-5 mt-6 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-800 focus:ring-4 focus:bg-purple-900 bg-primary">Iniciar</button>
  
        <p class="text-sm leading-relaxed text-grey-900 text-center">No tienes cuenta? <NuxtLink to="register"
            class="font-bold text-purple-800">Registrate</NuxtLink></p>
      </form>
    </div>
  </template>
  
  <script>
  import LoginService from "@/services/LoginService";
  import { validarEmail, validarPassword } from "~/funciones/validaciones";

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        if (this.validarEmail(this.email) && this.validarPassword(this.password)){
          let data = new FormData();
          data.append('email', $('#email').val());
          data.append('password', $('#password').val());
          LoginService.login(data)
            .then(response => {
              if (response.data.status == 'ok') {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_name', response.data.user.nombre);
                localStorage.setItem('user_role', response.data.user.rol);
                this.$swal({
                  title: 'Hola de nuevo, ' + response.data.user.nombre,
                  text: response.data.message,
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigateTo('/');
              } else {
                this.$swal({
                  title: 'Error',
                  text: response.data.message,
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch(error => {
              this.$swal('Error', error.response.data.message, 'error');
            });
        } else {
          this.$swal('Error', 'Por favor, revisa los campos', 'error'); 
        }
    },
    validarEmail,
    validarPassword
  }
}
  </script>
  
  <style scoped>
  form {
    padding: 20px;
    margin: 0 auto;
    margin-top: 30px;
    max-width: 450px;
  }
  </style>