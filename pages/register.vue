<template>
    <div>
        <!-- <loginHeader /> -->
        <div class="titulo font-extrabold text-2xl font-noto-sans mx-auto mt-10 text-center">
            <h1>Porta'm</h1>
            <h1 class="primary_color">Delivery</h1>
        </div>
        <form @submit.prevent="register" class="flex flex-col w-full h-full pb-6 rounded-3xl">
            <h3 class="mb-5 text-4xl font-extrabold text-dark-grey-900 text-center">Registrarse</h3>

            <label for="nombre" class="mb-2 mt-7 text-sm text-start text-grey-900">Nombre Completo<span class="text-primary text-base font-bold">*</span></label>
            <input id="nombre" v-model="nombre" type="text" placeholder="Nombre Apellido"
                class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-1 placeholder:text-grey-700 bg-slate-100 text-dark-zinc-900 rounded-2xl" />
            <p v-if="nombre.length > 0 && !validarNombre(nombre)" class="text-red-500 text-xs">Añade un nombre válido</p>

            <label for="email" class="mb-2 mt-3 text-sm text-start text-grey-900">Email<span class="text-primary text-base font-bold">*</span></label>
            <input id="email" v-model="email" type="email" placeholder="mail@portam.com"
                class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-200 mb-1 placeholder:text-grey-700 bg-slate-100 text-dark-zinc-900 rounded-2xl" />
            <p v-if="email.length > 0 && !validarEmail(email)" class="text-red-500 text-xs">Añade un correo válido</p>

            <label for="password" class="mb-2 mt-3 text-sm text-start text-grey-900">Contraseña<span class="text-primary text-base font-bold">*</span></label>
            <input id="password" v-model="password" type="password" placeholder="Ingresa tu contraseña"
                class="flex items-center w-full px-5 py-4 mb-1 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
            <p v-if="password.length > 0 && !validarPassword(password)" class="text-red-500 text-xs">La contraseña debe tener al menos 3 digitos</p>

            <label for="repassword" class="mb-2 mt-3 text-sm text-start text-grey-900">Repite Contraseña<span class="text-primary text-base font-bold">*</span></label>
            <input id="repassword" v-model="repassword" type="password" placeholder="Ingresa de nuevo tu contraseña"
                class="flex items-center w-full px-5 py-4 mb-1 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
            <p v-if="repassword.length > 0 && !validarPassword(repassword)" class="text-red-500 text-xs">La contraseña debe tener al menos 3 digitos</p>


            <label for="telefono" class="mb-2 mt-3 text-sm text-start text-grey-900">Número de Telefono</label>
            <input id="telefono" v-model="telefono" type="text" placeholder="633 444 555"
                class="flex items-center w-full px-5 py-4 mb-1 mr-2 text-sm font-medium outline-none focus:bg-slate-100 placeholder:text-grey-700 bg-slate-100 text-dark-grey-900 rounded-2xl" />
            <p v-if="telefono.length > 0 && !validarTelefono(telefono)" class="text-red-500 text-xs">Añade un número de teléfono válido</p>

            <button
                class="w-full mt-5 px-6 py-4 mx-auto mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-800 focus:ring-4 focus:bg-purple-900 bg-primary">
                Registrarse</button>
            <p class="text-sm leading-relaxed text-grey-900 text-center">Ya tienes una cuenta? <NuxtLink to="login"
                    class="font-bold text-purple-800">Inicia Sesión</NuxtLink>
            </p>
        </form>
    </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import { validarNombre, validarEmail, validarPassword, validarTelefono } from "~/funciones/validaciones";

export default {
    data() {
        return {
            nombre: '',
            email: '',
            password: '',
            repassword: '',
            telefono: ''
        }
    },
    watch: {
            nombre(value) {
                if (value.length > 0) {
                    this.nombre = value.charAt(0).toUpperCase() + value.slice(1);
                }
            }
    },
    methods: {
        register() {
            if (this.validarNombre(this.nombre) 
            && this.validarEmail(this.email) 
            && this.validarPassword(this.password)){
                let data = new FormData();
                data.append('nombre', $('#nombre').val());
                data.append('email', $('#email').val());
                data.append('password', $('#password').val());
                data.append('repassword', $('#repassword').val());
                data.append('telefono', $('#telefono').val());
                LoginService.register(data)
                    .then(response => {
                        if (response.data.status == 'ok') {
                            localStorage.setItem('token', response.data.access_token);
                            localStorage.setItem('user_id', response.data.user.id);
                            localStorage.setItem('user_name', response.data.user.nombre);
                            localStorage.setItem('user_role', response.data.user.rol);
                            this.$swal({
                                title: 'Bienvenid@ ' + response.data.user.nombre,
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigateTo('/');
                        } else {
                            this.$swal('Error1', response.data.message, 'error');
                        }
                    })
                    .catch(e => {
                        console.log(e.response.data);
                        this.$swal('Error', e.response.data.message, 'error');
                    });
            } else {
                this.$swal('Error', 'Por favor, rellena todos los campos correctamente', 'error');
            }
        },
        validarNombre(nombre) {
            return validarNombre(nombre);
        },
        validarEmail(email) {
            return validarEmail(email);
        },
        validarPassword(password) {
            return validarPassword(password);
        },
        validarTelefono(telefono) {
            return validarTelefono(telefono);
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