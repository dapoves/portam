<template>
    <div>
        <div v-if="!isPasado" class="mb-6 w-4/5 mx-auto">
            <NuxtLink :to="`ships/${props.envio.id}`">
                <div class="flex items-center">
                <IconCircleCheck v-if="props.envio.estado != 'cancelado'" color="white" fill="#15803d" :size="18" />
                <IconCircleX v-else color="red" :size="18" />
                <p class="text-sm ml-1 mr-2" :class="props.envio.estado !== 'cancelado' ? 'text-green-700' : 'text-red-600'">{{ props.envio.estado }}</p>
                <p class="text-sm text-gray-500"> {{ fechaFormateada }}</p>
            </div>
            <p class="my-1">{{ props.envio.descripcion }}</p>
            <div class="flex pb-2 items-center">
                <IconScrollText class="mr-1" color="#9139BA" />
                <IconCircle v-for="n in 4" class="mx-1"
                :fill="props.envio.estado != 'pendiente' ? '#9139BA' : '#9CA4AB'"  
                color="transparent" :size="11" />
                <IconPackageCheck class="mx-1"
                :color="['aceptado', 'en camino', 'entregado'].includes(props.envio.estado) ? '#9139BA' : '#9CA4AB'" />
                <IconCircle v-for="n in 4" class="mx-1"
                :fill="['en camino', 'entregado'].includes(props.envio.estado) ? '#9139BA' : '#9CA4AB'"  
                color="transparent" :size="11" />
                <IconBike class="mx-1"
                :color="['en camino', 'entregado'].includes(props.envio.estado) ? '#9139BA' : '#9CA4AB'" />
                <IconCircle v-for="n in 4" class="mx-1"
                :fill="['entregado'].includes(props.envio.estado) ? '#9139BA' : '#9CA4AB'"
                color="transparent" :size="11" />
                <IconHandPlatter class="mx-1"
                :color="props.envio.estado == 'entregado' ? '#9139BA' : '#9CA4AB'" />
            </div>
            <p class="text-gray-700">{{ info }}</p>
            </NuxtLink> 
        </div>
        <div v-else>
            <NuxtLink :to="`ships/${props.envio.id}`" class="flex px-6 mb-6 items-center cursor-pointer">
                <div class="pb-4">
                    <div class="flex items-center pl-3">
                        <IconCircleCheck v-if="props.envio.estado != 'cancelado'" color="white" fill="#15803d" :size="18" />
                        <IconCircleX v-else color="red" :size="18" />
                        <p class="text-xs ml-1 mr-1" :class="props.envio.estado !== 'cancelado' ? 'text-green-700' : 'text-red-600'">{{ props.envio.estado }}</p>
                        <p class="text-xs text-gray-500"> {{ fechaFormateada }}</p>
                    </div>
                    <p class="my-1 mx-4 font-semibold">{{ props.envio.descripcion }}</p>
                </div>
                <IconChevronRight class="ml-auto mr-6" color="#434E58" stroke-width="3" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    envio: Object
})

let fecha = new Date(props.envio.fechaPedido);
let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
let info = ref('');
let isPasado = ref(false);

if (props.envio.estado === 'entregado' || props.envio.estado === 'cancelado') {
    isPasado.value = true;
}

switch (props.envio.estado) {
    case 'pendiente':
        info.value = 'Tu envio está pendiente de ser aceptado por un repartidor';
        break;
    case 'aceptado':
        info.value = 'Tu envio ha sido aceptado y el repartidor está en camino a recogerlo';
        break;
    case 'en camino':
        info.value = 'Tu envio ha sido recogido por un repartidor y está en camino a su destino';
        break;
    case 'entregado':
        info.value = 'Tu envio ha sido entregado';
        break;
    case 'cancelado':
        info.value = 'Tu envio ha sido cancelado';
        break;
    default:
        info.value = 'Estado del envio desconocido';
}

</script>