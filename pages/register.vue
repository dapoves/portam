<template>
    <div class="text-center">
        <!-- <loginHeader /> -->
        <div class="titulo font-extrabold text-2xl font-noto-sans mx-auto mt-10 text-center">
            <h1>Porta'm</h1>
            <h1 class="primary_color">Delivery</h1>
        </div>
        <form @submit.prevent="register" class="flex flex-col w-full h-full pb-6 text-center rounded-3xl">
            <h3 class="mb-5 text-4xl font-extrabold text-dark-grey-900">Registrarse</h3>
            
            <label for="nombre" class="mb-2 mt-7 text-sm text-start text-grey-900">Nombre Completo*</label>
            <input id="nombre" type="text" placeholder="Nombre Apellido"
                class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-5 placeholder:text-grey-700 bg-slate-100 text-dark-zinc-900 rounded-2xl" />
           
            <label for="email" class="mb-2 text-sm text-start text-grey-900">Email*</label>
            <input id="email" type="email" placeholder="mail@portam.com"
                class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-5 placeholder:text-grey-700 bg-slate-100 text-dark-zinc-900 rounded-2xl" />
           
            <label for="password" class="mb-2 text-sm text-start text-grey-900">Contraseña*</label>
            <input id="password" type="password" placeholder="Ingresa tu contraseña"
                class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
            
            <label for="repassword" class="mb-2 text-sm text-start text-grey-900">Repite Contraseña*</label>
            <input id="repassword" type="password" placeholder="Ingresa de nuevo tu contraseña"
                class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
            
            <label for="telefono" class="mb-2 text-sm text-start text-grey-900">Número de Telefono</label>
            <input id="telefono" type="text" placeholder="633 444 555"
                class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />

            <button class="w-full px-6 py-4 mx-auto mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-800 focus:ring-4 focus:bg-purple-900 bg-purple-700">
                Registrarse</button>
            <p class="text-sm leading-relaxed text-grey-900">Ya tienes una cuenta? <NuxtLink to="login" class="font-bold text-purple-800">Inicia Sesión</NuxtLink></p>
        </form>
    </div>
</template>

<script>
export default {
    methods: {
        register() {
            console.log($('#nombre').val());
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