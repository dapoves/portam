<template>
    <div>
        <GeneralHeader>Pedido</GeneralHeader>
        <OrderProduct v-for="product in orderStore.products" :key="product.id" :product="product" />
        <div class="p-6">
            <p class="my-2 font-semibold text-[#171725]">Opciones de envío</p>
            <p class="my-3 font-semibold text-[#434E58]">{{ orderStore.stablish.nombre }}</p>
            <hr class="border-t-2">
            <div class="flex justify-between cursor-pointer z-1" @click="toggleTextarea">
                <p class="my-3 font-medium text-[#434E58]">Indicaciones extra </p>
                <IconChevronRight stroke-width="2" class="my-3 rotate" :class="{ 'rotate-90': mostrarTextarea }" />
            </div>
            <transition name="slide-down">
                <textarea v-if="mostrarTextarea" v-model="indicacionesExtra"
                    class="rounded-lg border border-gray-300 p-2 mt-1 w-full z-0" style="width: 100%;">
                </textarea>
            </transition>
            <div class="my-1 relative h-10 w-full min-w-[200px]">
                <div class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4">
                    <IconMapPin color="gray" />
                </div>
                <input v-model="direccion"
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#434E58] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" " />
                <label
                    class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none font-medium text-[#434E58] leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#434E58] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#434E58] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#434E58] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Dirección
                </label>
            </div>
            <hr class="border-t-4 mt-6">
            <p class="mt-6 mb-3 font-semibold text-[#171725]">Opciones de Pago</p>
            <div class="flex flex-wrap items-center justify-between cursor-pointer z-1" @click="toggleTarjetas">
                <p class="mb-3 font-medium text-[#434E58]">Tarjeta</p>
                <select v-if="tarjetas.length > 0" v-model="tarjeta_id" class="max-w-full text-gray-800 mb-3 rounded-lg border border-gray-300 p-2">
                    <option v-for="tarjeta in tarjetas" :value="tarjeta.id">{{ tarjetaOption(tarjeta) }}</option>
                </select>
            </div>
            <p class="text-primary text-right text-sm font-semibold underline cursor-pointer mb-3" @click="navigateTo('/paymentMethods')">Añadir método de pago</p>
            <hr class="border-t-2">
            <div class="flex justify-between mt-3">
                <p class="mb-3 font-medium text-[#434E58]">Subtotal productos</p>
                <p class="font-semibold text-[#434E58]">{{ orderStore.subtotal }}€</p>
            </div>
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Costes de envío</p>
                <p class="font-semibold text-[#434E58]">{{ orderStore.costeEnvio }}€</p>
            </div>
            <hr class="border-t-2">
            <div class="flex justify-between my-3">
                <p class="mb-3 font-bold text-[#434E58]">Pago Total</p>
                <p class="font-bold text-primary">{{ precioTotal }}€</p>
            </div>
            <button @click="pagar"
                class="align-middle select-none bg-purple-600 font-noto-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-4 px-6 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                type="button" data-ripple-light="true">
                Pagar 24€
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOrderStore } from '~/stores/order';
import PedidoService from '~/services/PedidoService';
import TarjetaService from '~/services/TarjetaService';
import Swal from 'sweetalert2';

const orderStore = useOrderStore();
let mostrarTextarea = ref(false);
let mostrarTarjetas = ref(false);
let indicacionesExtra = ref('');
let direccion = ref('');
let precioTotal = (orderStore.subtotal + orderStore.costeEnvio).toFixed(2);
let tarjetas = ref([]);
let tarjeta_id = ref('');


onMounted(async () => {
    await getTarjetas();
});

async function pagar() {

    let pedido = new FormData();
    pedido.append('cliente_id', localStorage.getItem('user_id'));
    pedido.append('establecimiento_id', orderStore.stablish.id);
    pedido.append('tarjeta_id', tarjeta_id.value);
    pedido.append('precioTotal', precioTotal);
    pedido.append('direccion', direccion.value);
    pedido.append('indicaciones', indicacionesExtra.value);
    await PedidoService.createPedido(pedido).then((response) => {
        orderStore.setOrder(response.data.pedido);
    });

    orderStore.products.forEach((product) => {
        let pedidoProducto = new FormData();
        pedidoProducto.append('pedido_id', orderStore.order.id);
        pedidoProducto.append('producto_id', product.id);
        PedidoService.addProduto(pedidoProducto);
    });

    Swal.fire({
        title: 'Pedido realizado',
        text: 'Tu pedido ha sido realizado con éxito y esta pendiente de ser aceptado por parte del establecimiento',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500
    });
    orderStore.clearOrder();

    navigateTo('/myOrders');
}


async function getTarjetas() {
    await TarjetaService.getMisTarjetas(localStorage.getItem('user_id')).then((response) => {
        tarjetas.value = response.data;
        tarjeta_id.value = tarjetas.value.find(tarjeta => tarjeta.predeterminada).id;
    });
}

function tarjetaOption(tarjeta) {
    return `${tarjeta.tipo.charAt(0).toUpperCase() + tarjeta.tipo.slice(1)} ${tarjeta.numero.slice(-4)} - ${tarjeta.titular}${tarjeta.predeterminada ? ' (Predeterminada)' : ''}`;
}

function toggleTextarea() {
    mostrarTextarea.value = !mostrarTextarea.value;
}

function toggleTarjetas() {
    mostrarTarjetas.value = !mostrarTarjetas.value;
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.5s ease-in-out;
}

.slide-down-enter,
.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0
}

.rotate {
    transition: transform 0.5s;
}

.rotate-90 {
    transform: rotate(90deg);
}
</style>