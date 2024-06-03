<template>
    <div>
    <div v-for="envio in envios" class="bg-white rounded-lg shadow-md border p-6 mx-6 mb-6">
        <div class="flex items-center justify-between mb-4">
            <div>
                <h2 class="text-lg font-semibold">{{ envio.cliente_id }}</h2>
                <p v-if="envio.estado == 'aceptado'" class="text-gray-500">{{ envio.direccionRecogida }}</p>
                <p v-if="envio.estado == 'en camino'" class="text-gray-500">{{ envio.direccionEntrega }}</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="bg-green-500 text-white px-2 rounded-full">{{ envio.estado }}</span>
                <button v-if="envio.estado == 'aceptado'" @click="recogerEnvio(envio)"
                    class="border p-1 rounded text-gray hover:bg-slate-100 flex items-center">
                    <IconCheck color="gray" />
                    <span class="mx-1">Recogido</span>
                </button>
            </div>
        </div>
        <hr class="border-gray-200 mb-4" />
        <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
                <h3 class="text-md font-semibold">Punto de Recogida</h3>
                <p class="text-gray-500">{{ envio.direccionRecogida }}</p>
            </div>
            <div>
                <h3 class="text-md font-semibold">Dirección Entrega</h3>
                <p class="text-gray-500">{{ envio.direccionEntrega }}</p>
            </div>
            <div>
                <h3 class="text-md font-semibold">Peso</h3>
                <p class="text-gray-500">{{ envio.peso }}</p>
            </div>
            <div>
                <h3 class="text-md font-semibold">Tiempo Espera</h3>
                <p class="text-gray-500">{{ envio.espera }}</p>
            </div>
            <div>
                <h3 class="text-md font-semibold">FechaPedido</h3>
                <p class="text-gray-500">{{ envio.fechaPedido }}</p>
            </div>
            <div>
                <h3 class="text-md font-semibold">Fecha Aceptado</h3>
                <p class="text-gray-500">{{ envio.fechaAceptado }}</p>
            </div>
            <div class="col-span-2">
                <h3 class="text-md font-semibold">Instrucciones</h3>
                <p class="text-gray-500">{{ envio.indicaciones || 'Sin instrucciones' }}</p>
            </div>
        </div>
        <hr class="border-gray-200 mt-4 mb-4" />
        <div class="flex items-center justify-between mt-4">
            <div>
                <h3 class="text-md font-semibold">{{ envio.descripcion }}</h3>
                <p class="text-primary font-semibold">{{ envio.precioTotal }}€</p>
            </div>
            <div class="flex items-center gap-2">
                <button @click="entregarEnvio(envio)" v-if="envio.estado != 'entregado'"
                    class="bg-primary p-2 text-white rounded hover:bg-primary-dark flex items-center">
                    <IconCheckCheck color="white" />
                    <span class="ml-1">Entregado</span>
                </button>
                <button @click="cancelarEnvio(envio)" v-if="envio.estado != 'entregado'"
                class=" text-white bg-red-500 hover:bg-red-600 p-2 rounded flex items-center">
                    <IconCircleX color="white" />
                    <span class="ml-1">Cancelar</span>
                </button>
            </div>
        </div>
    </div>
    <NotFound v-if="!envios.length" >No tienes ningún envío aceptado ahora mismo</NotFound>
    </div>
</template>

<script>
import RepartidorService from '~/services/RepartidorService';
import UserService from '~/services/UserService';

export default {
    data() {
        return {
            envios: [],
            nombre: '',
        }
    },
    mounted() {
        RepartidorService.getEnviosEnReparto(localStorage.getItem('user_id')).then((response) => {
            this.envios = response.data;

            this.envios.forEach((envio) => {
                UserService.getUser(envio.cliente_id).then((response) => {
                    envio.cliente_id = response.data.nombre;
                });
            });

        });
    },
    methods: {
        recogerEnvio(envio) {
            RepartidorService.recogerEnvio(envio.id).then((response) => {
                envio.estado = 'en camino';
            });
        },
        entregarEnvio(envio) {
            this.$swal({
                title: '¿Has entregado el pedido?',
                text: 'Confirma la entrega cuando hayas entregado el pedido al cliente',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, entregado',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    RepartidorService.entregarEnvio(envio.id).then((response) => {
                        envio.estado = 'entregado';
                    });
                }
            });
        },
        cancelarEnvio(envio) {
            this.$swal({
                title: '¿Seguro que quieres cancelar el envío?',
                text: 'Quedará registrado en tu historial de envíos cancelados',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'Volver'
            }).then((result) => {
                if (result.isConfirmed) {
                    RepartidorService.cancelarEnvio(envio.id).then(() => {
                        envio.estado = 'cancelado';
                    });
                    this.$swal('Cancelado', 'El envío ha sido cancelado', 'success');
                }
            });
        }

    }
}
</script>

<style></style>