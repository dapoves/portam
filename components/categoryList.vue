<template>
  <div>
    <div class="m-6 mb-4 flex overflow-x-scroll hide-scrollbar">
      <div v-for="(category, index) in categories" :key="index" class="categoria">
        <img :src="imagenUrl(category)" :alt="category.nombre" class="w-14 h-14 rounded-full object-cover">
        <p class="font-semibold text-center mt-2 ">{{ category.nombre }}</p>
      </div>
    </div>
    <div class="w-3/4 flex justify-center mx-auto">
      <button
        class="align-middle select-none bg-purple-600 font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-4 px-6 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
        type="button">
        Envío Personalizado
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CatService from '@/services/EstablecimientoService'

let categories = ref([]);
const baseUrl = 'http://127.0.0.1:8000/storage/categorias/';

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