<template>
    <div>
        <GeneralHeader>Envíos</GeneralHeader>
        <div class="text-center my-6">
            <p class="text-2xl font-semibold">{{ envio.descripcion }}</p>
            <p class="mt-2 text-xl">{{ envio.estado }}</p>
        </div>
        <div class="w-4/5 mx-auto">
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Precio Total</p>
                <p class="font-semibold text-primary">{{ envio.precioTotal }}€</p>
            </div>
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Método de pago</p>
                <p class="font-semibold text-[#434E58] text-right">{{ tarjetaString }}</p>
            </div>
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Dirección de recogida</p>
                <p class="font-semibold text-[#434E58] text-right">{{ envio.direccionRecogida }}, {{
                    poblacionOrigen.nombre }}</p>
            </div>
            <div class="flex justify-between">
                <p class="mb-3 font-medium text-[#434E58]">Dirección de entrega</p>
                <p class="font-semibold text-[#434E58] text-right">{{ envio.direccionEntrega }}, {{
                    poblacionDestino.nombre }}</p>
            </div>
            <p class="mb-3 font-medium text-[#434E58]">Seguimiento:</p>
            <div class="space-y-6 m-6 border-l-2 border-dashed w-3/5 mx-auto mt-6.">
                <div class="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-purple-500">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd" />
                    </svg>
                    <div class="ml-6">
                        <h4 class="font-bold text-purple-500">Envío Solicitado</h4>
                        <p class="mt-2 max-w-screen-sm text-sm text-gray-500">El pedido fue solicitado para recoger en
                            {{ envio.direccionRecogida }} de {{ poblacionOrigen.nombre }}
                            para entregar {{ tiempo }}</p>
                        <span class="mt-1 block text-sm font-semibold text-purple-500">{{ horaPedido }}</span>
                    </div>
                </div>
                <div v-if="envio.fechaAceptado" class="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-purple-500">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd" />
                    </svg>
                    <div class="ml-6">
                        <h4 class="font-bold text-purple-500">Aceptado</h4>
                        <p class="mt-2 max-w-screen-sm text-sm text-gray-500">La solicitud fue aceptada por el
                            repartidor Pepito</p>
                        <span class="mt-1 block text-sm font-semibold text-purple-500">{{ horaAceptado }}</span>
                    </div>
                </div>
                <div v-if="envio.fechaAceptado" class="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-purple-500">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd" />
                    </svg>
                    <div class="ml-6">
                        <h4 class="font-bold text-purple-500">Recogido</h4>
                        <p class="mt-2 max-w-screen-sm text-sm text-gray-500">Pepito ha recogido el paquete y está de
                            camino a {{ poblacionDestino.nombre }}, {{ envio.direccionEntrega }}</p>
                        <span class="mt-1 block text-sm font-semibold text-purple-500">{{ horaAceptado }}</span>
                    </div>
                </div>
                <div v-if="envio.fechaEntrega" class="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-purple-500">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clip-rule="evenodd" />
                    </svg>
                    <div class="ml-6">
                        <h4 class="font-bold text-purple-500">Entregado</h4>
                        <p class="mt-2 max-w-screen-sm text-sm text-gray-500">El paquete ha sido entregado en {{
                            poblacionDestino.nombre }}, {{ envio.direccionEntrega }}</p>
                        <span class="mt-1 block text-sm font-semibold text-purple-500">{{ horaEntregado }}</span>
                    </div>
                </div>
                <div v-if="envio.estado == 'cancelado'" class="relative w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full"
                        viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="red" />
                        <path fill="white" fill-rule="evenodd"
                            d="M16 8.707l-4.293 4.293L7.414 8.707l1.414-1.414L12 11.586l3.172-3.293 1.414 1.414zM8.707 16l4.293-4.293L16 13.414l-1.414 1.414L12 12.414l-3.293 3.172-1.414-1.414z" />
                    </svg>
                    <div class="ml-6">
                        <h4 class="font-bold text-red-500">Cancelado</h4>
                        <p class="mt-2 max-w-screen-sm text-sm text-gray-500">El envío ha sido cancelado</p>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import EnvioService from '~/services/EnvioService';
import EstablecimientoService from '~/services/EstablecimientoService';
import TarjetaService from '~/services/TarjetaService';

const route = useRoute();

let envio = ref({});
let fechaFormateada = ref('');
let poblacionOrigen = ref('');
let poblacionDestino = ref('');
let tiempo = ref('');
let horaPedido = ref('');
let horaAceptado = ref('');
let horaEntregado = ref('');
let tarjetaString = ref({});


EnvioService.getEnvio(route.params.id).then((response) => {
    envio.value = response.data;
    let fecha = new Date(envio.value.fechaEntrega);
    fechaFormateada.value = fecha.toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    TarjetaService.getTarjeta(envio.value.tarjeta_id).then((response) => {
        tarjetaString.value =  response.data.tipo.charAt(0).toUpperCase() + response.data.tipo.slice(1) + ' ' + response.data.numero.slice(-4);
    });

    EstablecimientoService.getPoblacion(envio.value.origen_id).then((response) => {
        poblacionOrigen.value = response.data;
    });

    EstablecimientoService.getPoblacion(envio.value.destino_id).then((response) => {
        poblacionDestino.value = response.data;
    });

    setCuando();
    horaPedido.value = new Date(envio.value.fechaPedido).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });
    if(envio.value.fechaAceptado){
        horaAceptado.value = new Date(envio.value.fechaAceptado).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });
    }
    if(envio.value.fechaEntrega){
        horaEntregado.value = new Date(envio.value.fechaEntrega).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' });
    }
});

function setCuando(){
    switch(envio.value.espera){
        case 'antes posible':
            tiempo.value = 'lo antes posible';
            break;
        case 'hoy':
            tiempo.value = 'hoy';
            break;
        case 'manyana':
            tiempo.value = 'mañana';
            break;
        case 'semana':
            tiempo.value = 'esta semana';
            break;
        case 'mes':
            tiempo.value = 'este mes';
            break;
    }
}

</script>