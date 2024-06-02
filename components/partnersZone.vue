<template>
    <div>
        <GeneralHeader>Área de Pedidos</GeneralHeader>
        <div v-if="pedidosAceptados.length > 0" class="flex justify-center pt-4">
            <div class="flex justify-center my-4 bg-slate-200 rounded-xl w-fit"
                :class="{ 'h-auto': activeTab === 'active' }">
                <button :class="{ 'bg-tertiary text-white': activeTab === 'active' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'active'">
                    Pendientes
                </button>
                <button :class="{ 'bg-tertiary text-white': activeTab === 'past' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'past'">
                    En Preparación
                </button>
            </div>
        </div>

        <div v-if="activeTab === 'active'" class="w-full max-w-4xl p-6 mx-auto">
            <transition name="slide" v-for="pedido in pedidos" :key="pedido.id">
                <div v-if="!pedido.aceptado"
                    class="bg-gray-100 rounded-lg p-4 px-12 mb-6 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <p class="text-lg font-medium mb-2">{{ pedido.cliente_id }}<span
                                class=" ml-1 text-xs font-light"> - Hace {{ pedido.tiempo }} min</span></p>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li v-for="producto in pedido.productos" :key="producto.id" class="mb-1">
                                {{ producto.pivot.cantidad }} x {{ producto.nombre }} - {{ producto.precio }}€
                            </li>
                        </ul>
                        <p class="text-lg font-bold mt-2">Total: {{ pedido.precioTotal }}€</p>
                        <p v-if="pedido.indicaciones" class="text-sm text-gray-600 mt-2"><strong>Indicaciones:</strong>
                            {{
                                pedido.indicaciones }}</p>
                    </div>
                    <div class="flex gap-2 mt-4 md:mt-0 flex-row md:ml-auto md:gap-0 md:space-x-2">
                        <button @click="aceptarPedido(pedido)"
                            class="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md">
                            <p>Aceptar</p>
                        </button>
                        <button @click="rechazarPedido(pedido)"
                            class="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md">
                            <p>Rechazar</p>
                        </button>
                    </div>
                </div>
            </transition>
        </div>

        <div v-if="activeTab === 'active' && !pedidos.length" class="w-full max-w-4xl p-6 mx-auto">
            <NotFound>pedidos pendientes</NotFound>
        </div>

        <div v-if="activeTab === 'past'" class="w-full max p-6 mx-auto">
            <div v-for="pedido in pedidosAceptados" :key="pedido.id"
                class="bg-gray-100 rounded-lg p-4 px-12 mb-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <p class="text-lg font-medium">{{ pedido.cliente_id }}
                        <span v-if="pedido.tiempo == 0" class=" ml-1 text-xs font-light"> - Aceptado hace un momento</span>
                        <span v-else class=" ml-1 text-xs font-light"> - Aceptado hace {{ pedido.tiempo }} min</span>
                    </p>
                    <p v-if="pedido.repartidor_id" class="text-xs font-light"><strong>Repartidor: </strong>{{ pedido.repartidor_id  }}</p>
                    <p v-else class="text-xs font-light">Repartidor sin asignar</p>
                    <ul class="text-sm text-gray-600 mt-2 space-y-1">
                        <li v-for="producto in pedido.productos" :key="producto.id" class="mb-1">
                            {{ producto.pivot.cantidad }} x {{ producto.nombre }} - {{ producto.precio }}€
                        </li>
                    </ul>
                    <p class="text-lg font-bold mt-2">Total: {{ pedido.precioTotal }}€</p>
                    <p v-if="pedido.indicaciones" class="text-sm text-gray-600 mt-2"><strong>Indicaciones:</strong>
                        {{
                            pedido.indicaciones }}</p>
                </div>
                <div class="flex gap-2 mt-4 md:mt-0 flex-row md:ml-auto md:gap-0 md:space-x-2">
                    <button @click="setOnTheWay(pedido)"
                        class="px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-md">
                        <p>Pedido Listo</p>
                    </button>
                    <button @click="rechazarPedido(pedido)"
                        class="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md">
                        <p>Rechazar</p>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import PedidoService from '~/services/PedidoService';
import UserService from '~/services/UserService';
import EstablecimientoService from '~/services/EstablecimientoService';

export default {
    data() {
        return {
            pedidos: [],
            activeTab: 'active',
            pedidosAceptados: [],
        };
    },
    async mounted() {
        // Obtenemos el usuario y su establecimiento_ïd
        const userResponse = await UserService.getUser(localStorage.getItem('user_id'));
        let idEstablecimiento = userResponse.data.establecimiento_id;
        const response = await EstablecimientoService.getPedidosPendientes(idEstablecimiento);
        this.pedidos = response.data;


        for (let pedido of this.pedidos) {
            const userResponse = await UserService.getUser(pedido.cliente_id);
            pedido.cliente_id = userResponse.data.nombre;
            pedido.tiempo = Math.floor((new Date() - new Date(pedido.fechaPedido)) / 60000);


            const productosResponse = await PedidoService.getProductosPedido(pedido.id);
            pedido.productos = productosResponse.data;
        }

        const aceptadosResponse = await EstablecimientoService.getPedidosAceptados(idEstablecimiento);
        this.pedidosAceptados = aceptadosResponse.data;

        for (let pedido of this.pedidosAceptados) {
            const userResponse = await UserService.getUser(pedido.cliente_id);
            pedido.cliente_id = userResponse.data.nombre;
            pedido.tiempo = Math.floor((new Date() - new Date(pedido.fechaAceptado)) / 60000);

            const repartidorResponse = await UserService.getUser(pedido.repartidor_id);
            pedido.repartidor_id = repartidorResponse.data.nombre;

            const productosResponse = await PedidoService.getProductosPedido(pedido.id);
            pedido.productos = productosResponse.data;

        }
    },
    methods: {
        async aceptarPedido(pedido) {
            await EstablecimientoService.aceptarPedido(pedido.id);
            pedido.aceptado = true;
            this.pedidosAceptados.push(pedido);
            pedido.tiempo = 0;
        },
        async rechazarPedido(pedido) {
            this.$swal.fire({
                title: '¿Seguro que quieres rechazar el pedido?',
                text: "El cliente será notificado de la cancelación del pedido.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Sí, rechazar',
                cancelButtonText: 'Volver',
            }).then((result) => {
                if (result.isConfirmed) {
                    EstablecimientoService.rechazarPedido(pedido.id);
                    this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
                    this.pedidosAceptados = this.pedidosAceptados.filter(p => p.id !== pedido.id);
                }
            });
        },
        setOnTheWay(pedido) {
            this.$swal.fire({
                title: '¿Seguro que quieres marcar el pedido como listo?',
                text: "Solo debes marcarlo como listo si el repartidor ya ha recogido el pedido.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                confirmButtonText: 'Sí, listo',
                cancelButtonText: 'Volver',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal.fire({
                        title: '¡Pedido listo!',
                        text: 'El cliente será notificado de que su pedido está en camino.',
                        icon: 'success',
                        confirmButtonColor: '#9139BA',
                        showconfirmButton: false,
                        timer: 2500,
                    });
                    EstablecimientoService.setOnTheWay(pedido.id);
                    this.pedidosAceptados = this.pedidosAceptados.filter(p => p.id !== pedido.id);
                }
            });
        }
    }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 1s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>