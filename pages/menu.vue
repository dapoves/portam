<template>
  <div>
    <div class="flex justify-between p-9 px-6 w-full h-full absolute top-0 bg-purple-700 z-10">
      <NuxtLink @click="$router.go(-1)" class="cursor-pointer">
        <IconChevronLeft stroke-width="3" color="white" :size="28" />
      </NuxtLink>
      <p class="text-2xl mt-10 text-white">¡Hola {{ username }}!</p>
      <NuxtLink @click="$router.go(-1)" class="opacity-0">
        <IconChevronLeft stroke-width="3" color="white" :size="28" />
      </NuxtLink>
    </div>
    <div class="bg-white h-full w-full mt-32 absolute z-20 rounded-t-3xl ">
      <NuxtLink to="/account"class="flex px-6 py-4  border-b border-gray-200">
        <IconCircleUserRound color="#9139BA" />
        <p class="pl-4">Cuenta</p>
      </NuxtLink>
      <NuxtLink class="flex px-6 py-4  border-b border-gray-200">
        <IconShoppingCart color="#9139BA" />
        <p class="pl-4">Pedidos</p>
      </NuxtLink>
      <NuxtLink class="flex px-6 py-4  border-b border-gray-200">
        <IconTruck color="#9139BA" />
        <p class="pl-4">Envíos</p>
      </NuxtLink>
      <NuxtLink to="/paymentmethods" class="flex px-6 py-4  border-b border-gray-200">
        <IconCreditCard color="#9139BA" />
        <p class="pl-4">Métodos de pago</p>
      </NuxtLink>
      <NuxtLink class="flex px-6 py-4  border-b border-gray-200">
        <IconThumbsUp color="#9139BA" />
        <p class="pl-4">Favoritos</p>
      </NuxtLink>
      <div class="px-6 py-2 bg-purple-300 border-b border-gray-200">
        <p class="font-semibold">Zona de repartidor</p>
      </div>
      <NuxtLink class="flex items-center px-6 py-4  border-b border-gray-200">
        <IconClipboardPenLine color="#9139BA" />
        <p class="pl-4">Solicitud de verificación como repartidor</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  computed: {
    username() {
      return localStorage.getItem('user_name');
    }
  },
}
</script>

<style></style>
