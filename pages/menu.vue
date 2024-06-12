<template>
  <div class="flex justify-center">
    <div class="flex justify-between p-9 px-6 w-full h-full absolute top-0 bg-primary z-10">
      <NuxtLink @click="$router.go(-1)" class="cursor-pointer">
        <IconChevronLeft stroke-width="3" color="white" :size="28" />
      </NuxtLink>
      <p class="text-2xl mt-12 text-white font-semibold text-center">¡Hola {{ username }}!</p>
      <NuxtLink @click="$router.go(-1)" class="opacity-0">
        <IconChevronLeft stroke-width="3" color="white" :size="28" />
      </NuxtLink>
    </div>
    <div class="bg-white h-full w-full max-w-screen-md mt-36 absolute z-20 rounded-t-3xl mx-auto">
      <NuxtLink to="/myorders" class="flex px-6 py-4  border-b border-gray-200">
        <IconShoppingCart color="#9139BA" />
        <p class="pl-4">Pedidos</p>
      </NuxtLink>
      <NuxtLink to="/myships" class="flex px-6 py-4  border-b border-gray-200">
        <IconTruck color="#9139BA" />
        <p class="pl-4">Envíos</p>
      </NuxtLink>
      <NuxtLink to="/paymentmethods" class="flex px-6 py-4  border-b border-gray-200">
        <IconCreditCard color="#9139BA" />
        <p class="pl-4">Métodos de pago</p>
      </NuxtLink>
      <NuxtLink :to="`/favoritos/${user}`" class="flex px-6 py-4  border-b border-gray-200">
        <IconThumbsUp color="#9139BA" />
        <p class="pl-4">Favoritos</p>
      </NuxtLink>
      <div v-if="isSocio || isRepartidor" class="px-6 py-2 bg-purple-300 border-b border-gray-200 cursor-pointer" @click="toDeliverys">
        <p v-if="isSocio" class="font-semibold">Área de pedidos</p>
        <p v-else class="font-semibold">Área de repartidor</p>
      </div>
      <NuxtLink v-if="isSocio" to="/adminStablish" class="flex px-6 py-4  border-b border-gray-200">
        <IconStore color="#9139BA" />
        <p class="pl-4">Administración</p>
      </NuxtLink>
      <NuxtLink v-if="isRepartidor" to="/currentDelivery" class="flex px-6 py-4  border-b border-gray-200">
        <IconRadar color="#9139BA" />
        <p class="pl-4">Entrega en Curso</p>
      </NuxtLink>
      <div @click="logout" class="flex cursor-pointer items-center px-6 py-4  border-b border-gray-200">
        <IconLogOut color="#9139BA" />
        <p class="pl-4">Cerrar Sesión</p>
      </div>
    </div>
  </div>
</template>

<script>
import { isRepartidor, isSocio } from '~/funciones/authorization.js';


export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      this.$router.push('/login');
    },
    toDeliverys() {
      if (isSocio || isRepartidor) {
        navigateTo('/deliverys');
      } else {
        this.$swal({
          title: 'Lo sentimos, no eres repartidor',
          text: 'No puedes acceder a esta sección',
          imageUrl: 'https://damian.jdfs.dev/storage/emojis/crying.png',
          imageAlt: 'Error Image'
        });
      }
    }
  },
  computed: {
    username() {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('user_name');
      } else {
        return null;
      }
    },
    user() {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('user_id'));
      } else {
        return null;
      }
    },
    isRepartidor() {
      return isRepartidor();
    },
    isSocio() {
      return isSocio();
    },
  },
}
</script>

<style></style>