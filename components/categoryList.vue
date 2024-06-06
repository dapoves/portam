<template>
  <div>
    <div class="m-6 mb-4 p-2 flex overflow-x-auto space-x-4 hide-scrollbar flex md:justify-between">
      <div v-for="(category, index) in categories" :key="index"
        class="flex flex-col items-center min-w-[80px] md:min-w-[100px] text-center transform transition-transform duration-200 hover:scale-105 cursor-pointer">
        <img :src="imagenUrl(category)" :alt="category.nombre" class="w-14 h-14 md:w-16 md:h-16 object-cover">
        <p class="font-semibold text-center mt-2 text-gray-800 text-sm max-w-[96px] md:max-w-[115px] break-words">{{ category.nombre }}</p>
      </div>
    </div>

    <div class="w-3/4 flex justify-center mx-auto">
      <button
        class="align-middle select-none bg-purple-600 font-noto-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-4 px-6 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
        type="button" @click="navigateTo('/ship')" data-ripple-light="true">
        Envío Personalizado
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CatService from '@/services/EstablecimientoService'

let categories = ref([]);
const baseUrl = 'https://damian.jdfs.dev/storage/categorias/';

function imagenUrl(category) {
  return baseUrl + category.imagen;
}

function getCategories() {
  CatService.getCategorias().then((response) => {
    categories.value = response.data.map(category => {
      return {
        ...category,
        imagenUrl: imagenUrl(category)
      }
    });
  });
}

onMounted(getCategories);
</script>
<style>
.categoria {
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>