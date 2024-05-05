<template>
  <div class="text-center">
    <!-- <loginHeader /> -->
    <div class="titulo font-extrabold text-2xl font-noto-sans mx-auto mt-10 text-center">
      <h1>Porta'm</h1>
      <h1 class="primary_color">Delivery</h1>
    </div>
    <form class="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
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
      <div class="flex flex-row justify-between mb-8">
        <label class="relative inline-flex items-center mr-3 cursor-pointer select-none">
          <input type="checkbox" checked value="" class="sr-only peer">
          <div
            class="w-5 h-5 bg-white border-2 rounded-sm border-slate-100 peer peer-checked:border-0 peer-checked:bg-purple-800">
            <img class=""
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
              alt="tick">
          </div>
          <span class="ml-3 text-sm font-normal text-grey-900">Mantener la sesión iniciada?</span>
        </label>
      </div>
      <button class="w-full px-6 py-4 mx-auto mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-800 focus:ring-4 focus:bg-purple-900 bg-purple-700">Iniciar</button>

      <p class="text-sm leading-relaxed text-grey-900">No tienes cuenta? <NuxtLink to="register"
          class="font-bold text-purple-800">Registrate</NuxtLink></p>
    </form>
  </div>
</template>

<script>
export default {

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