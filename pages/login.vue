<template>
    <div class="text-center">
      <!-- <loginHeader /> -->
      <div class="titulo font-extrabold text-2xl font-noto-sans mx-auto mt-10 text-center">
        <h1>Porta'm</h1>
        <h1 class="primary_color">Delivery</h1>
      </div>
      <form @submit.prevent="login" class="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
        <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">Iniciar Sesión</h3>
        <a
          class="flex items-center justify-center w-full py-4 mb-6 mt-10 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:bg-slate-100">
          <img class="h-5 mr-2"
            src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
            alt="">
          Iniciar con Google
        </a>
        <div class="flex items-center mb-3">
          <hr class="h-0 border-b border-solid border-slate-100 grow">
          <p class="mx-4 text-grey-600">or</p>
          <hr class="h-0 border-b border-solid border-slate-100 grow">
        </div>
        <label for="email" class="mb-2 text-sm text-start text-grey-900">Email*</label>
        <input id="email" type="email" placeholder="mail@portam.com"
          class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-7 placeholder:text-grey-700 bg-slate-100 text-dark-zinc-900 rounded-2xl" />
        <label for="password" class="mb-2 text-sm text-start text-grey-900">Contraseña*</label>
        <input id="password" type="password" placeholder="Ingresa tu contraseña"
          class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
        <button class="w-full px-6 py-4 mx-auto mb-5 mt-4 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-800 focus:ring-4 focus:bg-purple-900 bg-primary">Iniciar</button>
  
        <p class="text-sm leading-relaxed text-grey-900">No tienes cuenta? <NuxtLink to="register"
            class="font-bold text-purple-800">Registrate</NuxtLink></p>
      </form>
    </div>
  </template>
  
  <script>
  import LoginService from "@/services/LoginService";

  export default {
    methods: {
      login() {
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
            console.log(error);
          });
    }
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