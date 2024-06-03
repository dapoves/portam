<template>
<div class="relative px-6 max-w-lg mx-auto pb-4">
    <div class="bg-gray-100 rounded-lg p-4 pb-2 group transition-all duration-300">
    <div class="group-hover:opacity-20 transition-opacity duration-300">
        <div class="flex items-center mb-2">
            <IconLocate color="blue"/>
            <p class="text-lg  font-semibold ml-1">{{ establecimiento.nombre }} <span class="text-xs font-light">{{ establecimiento.direccion }}</span></p>
        </div>
        <div class="flex items-center mb-1 flex-wrap">
            <div class="flex items-center pr-8">
                <IconMapPin color="red" :size="16" />
                <p class="font-light  text-sm ml-1">{{ pedido.direccion }}</p>
            </div>
            <div class="flex items-center">
                <IconClock color="gray" :size="16" />
                <p class="font-light  text-sm ml-1">Hace {{ tiempoPedido }} min</p>
            </div>
        </div>
        <div class="flex items-center mb-2 flex-wrap">
            <div class="flex items-center pr-8 mb-1">
                <IconListChecks color="gray" :size="16" />
                <p class="font-light  text-sm ml-1"><span class="font-normal">Indicaciones: </span>{{ pedido.indicaciones }}</p>
            </div>
            <div class="flex items-center">
                <IconShoppingBasket color="gray" :size="16" />
                <p class="font-light  text-sm ml-1">{{ productos.map(producto => producto.nombre).join(', ') }}</p>
            </div>
        </div>
    </div>
    <button
      @click="repartirPedido"
      data-ripple-light="true" type="button"
      class="bg-primary text-white rounded-lg py-2 px-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Repartir por {{ establecimiento.costeEnvio }}€</button>
</div>

</div>

</template>
<script>
import dayjs from 'dayjs';
import PedidoService from '~/services/PedidoService';
import EstablecimientoService from '~/services/EstablecimientoService';
import RepartidorService from '~/services/RepartidorService';

export default {
    props: {
        pedido: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            establecimiento: {},
            productos: []
        };
    },
    computed: {
        tiempoPedido() {
            const ahora = dayjs();
            const fechaPedido = dayjs(this.pedido.fechaPedido);
            const diferencia = ahora.diff(fechaPedido, 'minute');
            return diferencia;
        }
    },
    mounted() {
        EstablecimientoService.getEstablecimiento(this.pedido.establecimiento_id).then((response) => {
            this.establecimiento = response.data;
        });
        PedidoService.getProductosPedido(this.pedido.id).then((response) => {
            this.productos = response.data;
        });
    },
    methods: {
        repartirPedido() {
            this.$swal({
                title: '¿Seguro que quieres repartir este pedido?',
                text: 'Deberás hacerte cargo de la entrega del pedido y recibirás una compensación por ello.',
                showCancelButton: true,
                confirmButtonText: 'Repartir',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#9139BA',
            })
            .then((confirm) => {
                if (confirm.isConfirmed) {
                   let data = new FormData();
                   data.append('pedido_id', this.pedido.id);
                   data.append('repartidor_id', localStorage.getItem('user_id')); 
                   RepartidorService.repartirPedido(data).then((response) => {
                        this.$swal({
                            title: response.data.message,
                            text: `Dirígete a ${this.establecimiento.nombre}, ${this.establecimiento.direccion} para recoger el pedido.`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        navigateTo('/currentDelivery');
                   });
                } 
            });
        }
    }
}
</script>