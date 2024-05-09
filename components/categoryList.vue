<template>
    <div class="m-10 flex">
        <div v-for="(category, index) in categories" :key="index">
            <img :src="imagenUrl(category)" :alt="category.nombre" class="w-14 h-14 rounded-full">
            {{ category.nombre }}
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
    console.log(categories.value);
  });
}

onMounted(getCategories);
</script>
