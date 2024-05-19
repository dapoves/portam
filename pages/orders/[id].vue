<template>
    <div>
        <GeneralHeader>Pedidos</GeneralHeader>
        <img :src="imagenUrl(stablish)" alt="imagen establecimiento" class="w-full h-44 object-cover" />
        <div class="text-center my-6">
            <p class="text-3xl font-semibold">{{ stablish.nombre }}</p>
            <p class="mt-2">{{ fechaFormateada }}</p>
        </div>
        <div class="w-4/5 mx-auto">
            <OrderProduct v-for="product in products" :key="product.id" :product="product" />
            <div class="flex justify-between pt-6">
                <p class="mb-3 font-medium text-[#434E58]">Método de Pago</p>
                <p>VISA ...3445</p>
            </div>
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Indicaciones extra</p>
                <p v-if="pedido.indicaciones" class="pl-6 text-justify">{{ pedido.indicaciones }} </p>
                <p v-else class="pl-6">Sin indicaciones</p>
            </div>
            <div class="flex justify-between mt-3">
                <p class="mb-3 font-medium text-[#434E58]">Subtotal productos</p>
                <p class="font-semibold text-[#434E58]">{{ subtotal }}€</p>
            </div>
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Costes de envío</p>
                <p class="font-semibold text-[#434E58]">{{ stablish.costeEnvio }}€</p>
            </div>
            <hr class="border-t-2">
            <div class="flex justify-between my-3">
                <p class="mb-3 font-bold text-[#434E58]">Pago Total</p>
                <p class="font-bold text-[#9139BA]">{{ pedido.precioTotal }}€</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import PedidoService from '~/services/PedidoService';
import EstablecimientoService from '~/services/EstablecimientoService';

const route = useRoute();
const stablishUrl = 'http://127.0.0.1:8000/storage/establecimientos/';
let pedido = ref({});
let stablish = ref({});
let products = ref([]);
let subtotal = ref(0);
let fechaFormateada = ref('');

PedidoService.getPedido(route.params.id).then((response) => {
  pedido.value = response.data;
  
  let fecha = new Date(pedido.value.fechaPedido);
  fechaFormateada.value = fecha.toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  
  EstablecimientoService.getEstablecimiento(pedido.value.establecimiento_id).then((response) => {
    stablish.value = response.data;
  });

  PedidoService.getProductosPedido(route.params.id).then((response) => {
    products.value = response.data;
    products.value.forEach((product) => {
      subtotal.value += product.precio;
    });
  });
});

function imagenUrl(stablish) {
  return stablishUrl + stablish.imagen;
}
</script>