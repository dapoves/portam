<template>
  <div>
    <div class="flex items-start space-x-4 p-4 px-6 bg-white">
        <img :src="imagenUrl(props.product)" :alt="props.product.nombre" class="w-20 h-20 rounded-lg object-cover">
        <div class="space-y-1">
            <p class="font-bold text-lg"> {{ props.product.nombre }} <span class="text-xl text-purple-400 font-bold m-4" v-if="props.product.pivot">x{{ props.product.pivot.cantidad }}</span></p>
            <p class="font-semibold text-purple-800 text-sm">{{ props.product.precio }}€</p>
        </div>
    </div>
    <hr class="border-t-2">
  </div>
</template>
<script setup> 
const props = defineProps({
  product: Object
}) 

const baseUrl = 'http://127.0.0.1:8000/storage/productos/';

function imagenUrl(product) {
  return baseUrl + product.imagen;
}
</script>