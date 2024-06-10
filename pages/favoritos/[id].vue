<template>
    <div>
        <GeneralHeader>Favoritos</GeneralHeader>
        <NuxtLink v-for="favorito in favoritos" :to="`/stablishments/${favorito.establecimiento.id}`" class="flex px-6 mb-6 my-8 items-center cursor-pointer">
                <img :src="imagenUrl(favorito)" class="w-24 h-24 rounded-lg object-cover shadow">
                <div class="pb-4">
                    <p class="my-1 mx-4 font-semibold"> {{ favorito.establecimiento.nombre }}  </p>
                    <p class="text-xs mx-4 text-gray-500"> {{ fechaFormateada(favorito.created_at) }}</p>
                </div>
                <IconChevronRight class="ml-auto mr-6" color="#434E58" stroke-width="3" />
            </NuxtLink>
    </div>
</template>
<script setup>
import EstablecimientoService from '~/services/EstablecimientoService';

const baseUrl = 'https://damian.jdfs.dev/storage/establecimientos/';
const route = useRoute();
let favoritos = ref([]);

function getStablishments() {
  EstablecimientoService.getFavoritos(route.params.id).then((response) => {
    favoritos.value = response.data;
  });
}
function imagenUrl(favorito) {
  return baseUrl + favorito.establecimiento.imagen;
}

function fechaFormateada(fecha) {
  let date = new Date(fecha);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}


onMounted(getStablishments);
</script>