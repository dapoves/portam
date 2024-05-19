<template>
    <div>
        <div v-if="!isPasado" class="px-6 mb-6">
            <div class="flex items-center">
                <IconCircleCheck v-if="props.pedido.estado != 'cancelado'" color="white" fill="#15803d" :size="18" />
                <IconCircleX v-else color="red" :size="18" />
                <p class="text-sm ml-1 mr-2" :class="props.pedido.estado !== 'cancelado' ? 'text-green-700' : 'text-red-600'">{{ props.pedido.estado }}</p>
                <p class="text-sm text-gray-500"> {{ fechaFormateada }}</p>
            </div>
            <p class="my-1">{{ stablish.nombre }}</p>
            <div class="flex pb-2 items-center">
                <IconScrollText class="mr-1" color="#9139BA" />
                <IconCircle v-for="n in 4" class="mx-1"
                :fill="props.pedido.estado != 'pendiente' ? '#9139BA' : '#9CA4AB'"  
                color="transparent" :size="11" />
                <IconSoup class="mx-1"
                :color="['aceptado', 'en camino', 'entregado'].includes(props.pedido.estado) ? '#9139BA' : '#9CA4AB'" />
                <IconCircle v-for="n in 4" class="mx-1"
                :fill="['en camino', 'entregado'].includes(props.pedido.estado) ? '#9139BA' : '#9CA4AB'"  
                color="transparent" :size="11" />
                <IconBike class="mx-1"
                :color="['en camino', 'entregado'].includes(props.pedido.estado) ? '#9139BA' : '#9CA4AB'" />
                <IconCircle v-for="n in 4" class="mx-1"
                :fill="['entregado'].includes(props.pedido.estado) ? '#9139BA' : '#9CA4AB'"
                color="transparent" :size="11" />
                <IconHandPlatter class="mx-1"
                :color="props.pedido.estado == 'entregado' ? '#9139BA' : '#9CA4AB'" />
            </div>
            <p class="text-gray-700">{{ info }}</p>
        </div>
        <div v-else class="px-6 mb-6">
            <img :src="imagenUrl(stablish)" class="w-24 h-24 rounded-lg object-cover shadow">
        </div>
    </div>
</template>

<script setup>
import EstablecimientoService from '~/services/EstablecimientoService';
const props = defineProps({
    pedido: Object
})
const baseUrl = 'http://127.0.0.1:8000/storage/establecimientos/';
let fecha = new Date(props.pedido.fechaPedido);
let today = new Date();
let isToday = fecha.toDateString() === today.toDateString();
let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
let stablish = ref('');
let info = ref('');
let isPasado = ref(false);

EstablecimientoService.getEstablecimiento(props.pedido.establecimiento_id).then((response) => {
    stablish.value = response.data;
});

if (['entregado', 'cancelado'].includes(props.pedido.estado) && !isToday) {
    isPasado.value = true;
}

switch (props.pedido.estado) {
    case 'pendiente':
        info.value = 'Tu pedido está pendiente de ser aceptado por el establecimiento';
        break;
    case 'aceptado':
        info.value = 'Tu pedido ha sido aceptado y está en proceso de preparación';
        break;
    case 'en camino':
        info.value = 'Tu pedido ha sido aceptado por un repartidor y está en camino';
        break;
    case 'entregado':
        info.value = 'Tu pedido ha sido entregado';
        break;
    case 'cancelado':
        info.value = 'Tu pedido ha sido cancelado';
        break;
    default:
        info.value = 'Estado del pedido desconocido';
}

function imagenUrl(stablish) {
  console.log(baseUrl + stablish.imagen);
  return baseUrl + stablish.imagen;
}

</script>