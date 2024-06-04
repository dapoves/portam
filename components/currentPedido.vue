<template>
    <div>
        <div v-if="pedido">
            <div class="order-details w-4/5 mx-auto pt-3 max-w-4xl">
                <div class="order-info mb-4 py-6">
                    <div class="flex justify-between my-3">
                        <p><strong>{{ establecimiento.nombre }},</strong> {{ establecimiento.direccion }}</p>
                        <IconMoveRight color="#9139BA" class="mx-2" />
                        <p><strong>{{ cliente.nombre }},</strong> {{ pedido.direccion }}</p>
                    </div>
                    <div class="flex flex-wrap justify-between mt-2">
                        <p class="my-2"><strong class="text-[#434E58]">Pedido:</strong> {{ pedido.fechaPedido }}</p>
                        <p class="my-2"><strong class="text-[#434E58]">Aceptado:</strong> {{ pedido.fechaAceptado }}</p>
                        <p class="my-2"><strong class="text-[#434E58]">Tiempo transcurrido: </strong> {{
                            tiempoTranscurrido
                            }}</p>
                        <p class="my-2"><strong class="text-[#434E58]">Tiempo estimado de preparación:</strong> {{ establecimiento.tiempoPreparacion }} min</p>
                    </div>
                    <div v-for="producto in productos" class="flex items-start space-x-4 pt-4 bg-white">
                        <img :src="imagenUrl(producto)" :alt="producto.nombre"
                            class="w-14 h-14 md:w-20 md:h-20 rounded-lg object-cover">
                        <div class="space-y-1">
                            <p class="font-semibold">{{ producto.nombre }} <span class="m-2 font-medium text-lg" v-if="producto.pivot.cantidad > 1"> x{{ producto.pivot.cantidad }}</span> </p>
                            <p class="text-sm md:block hidden">{{ producto.descripcion }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex mx-auto max-w-lg px-2">
                <div @click="entregarPedido"
                    class="bg-primary flex justify-center items-center text-white text-center cursor-pointer rounded-lg mx-3 py-2 w-1/2 hover:bg-primary-dark active:bg-primary-darker transition-colors duration-200">
                    <IconCheckCheck color="white" class="mx-1" />
                    <p class="text-lg">Entregado</p>
                </div>
                <div @click="cancelarPedido"
                    class="bg-red-500 flex justify-center items-center text-white text-center cursor-pointer rounded-lg mx-3 py-2 w-1/2 hover:bg-red-600 active:bg-red-700 transition-colors duration-200">
                    <IconCircleX color="white" class="mx-1" />
                    <p class="text-lg">Cancelar</p>
                </div>
            </div>
        </div>
        <NotFound v-else >No estás repartiendo ningún pedido ahora mismo</NotFound>
    </div>
</template>

<script>
import RepartidorService from '~/services/RepartidorService';
import EstablecimientoService from '~/services/EstablecimientoService';
import UserService from '~/services/UserService';
import PedidoService from '~/services/PedidoService';

export default {
    data() {
        return {
            pedido: null,
            establecimiento: {},
            cliente: {},
            productos: [],
        };
    },
    computed: {
        tiempoTranscurrido() {
            return Math.round((Date.now() - new Date(this.pedido.fechaAceptado)) / 60000) + ' min';
        }
    },
    mounted() {
        RepartidorService.getPedidoEnReparto(localStorage.getItem('user_id')).then((response) => {
            if (!response.data.message) {
                this.pedido = response.data;
                EstablecimientoService.getEstablecimiento(this.pedido.establecimiento_id).then((response) => {
                    this.establecimiento = response.data;
                });
                UserService.getUser(this.pedido.cliente_id).then((response) => {
                    this.cliente = response.data;
                });

                PedidoService.getProductosPedido(this.pedido.id).then((response) => {
                    this.productos = response.data;
                });
            }
        });
    },
    methods: {
        imagenUrl(producto) {
            return `http://127.0.0.1:8000/storage/productos/` + producto.imagen;
        },
        entregarPedido() {
            this.$swal({
                title: '¿Has entregado el pedido?',
                text: "Si confirmas la entrega no podrás revertir la acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                confirmButtonText: 'Entregado',
                cancelButtonText: 'Volver'
            }).then((result) => {
                if (result.isConfirmed) {
                    RepartidorService.entregarPedido(this.pedido.id).then((response) => {
                        this.$swal({
                            title: 'Pedido entregado',
                            text: '¡Muchas gracias!',
                            icon: 'success',
                            confirmButtonColor: '#9139BA',
                            confirmButtonText: 'Aceptar',
                            timer: 5000,
                        });
                        navigateTo('/deliverys')
                    });
                }
            });
        },
        cancelarPedido(){
            this.$swal({
                title: '¿Estás seguro de cancelar el pedido?',
                text: "La cancelación quedará registrada en tu historial de entregas",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                confirmButtonText: 'Cancelar',
                cancelButtonText: 'Volver'
            }).then((result) => {
                if (result.isConfirmed) {
                    RepartidorService.cancelarPedido(this.pedido.id).then((response) => {
                        console.log(response);
                        this.$swal({
                            title: 'Pedido cancelado',
                            icon: 'success',
                            confirmButtonColor: '#9139BA',
                            confirmButtonText: 'Aceptar',
                            timer: 5000,
                        });
                        navigateTo('/deliverys')
                    });
                }
            });
        }
    }
}

</script>