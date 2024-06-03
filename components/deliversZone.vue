<template>
    <div>
        <GeneralHeader>Área de Repartidores</GeneralHeader>
        <div class="flex justify-center py-4">
            <div class="flex justify-center my-4 bg-slate-200 rounded-xl w-fit"
                :class="{ 'h-auto': activeTab === 'active' }">
                <button :class="{ 'bg-tertiary text-white': activeTab === 'active' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'active'">
                    Pedidos
                </button>
                <button :class="{ 'bg-tertiary text-white': activeTab === 'past' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'past'">
                    Envios
                </button>
            </div>
        </div>
        <div v-if="activeTab === 'active'">
            <OrderRequest v-for="pedido in pedidos" :key="pedido.id" :pedido="pedido" />
            <NotFound v-if="!pedidos.length">Ahora mismo no hay ningún pedido para repartir</NotFound>
        </div>
        <div v-if="activeTab === 'past'">
            <DeliveryRequest v-for="envio in envios" :key="envio.id" :envio="envio" />
            <NotFound v-if="!envios.length">Ahora mismo no hay ningún envío para repartir</NotFound>
        </div>
    </div>
</template>
<script>
import PedidoService from '~/services/PedidoService';
import EnvioService from '~/services/EnvioService';

export default {
    data() {
        return {
            userId: null,
            activeTab: 'active',
            pedidos: [],
            envios: [],
        };
    },
    mounted() {
        this.userId = localStorage.getItem('user_id');
        if (this.userId) {
            PedidoService.getPedidos().then((response) => {
                this.pedidos = response.data.filter(pedido => pedido.estado === 'aceptado'  && !pedido.repartidor_id);
            });
            EnvioService.getEnvios().then((response) => {
                this.envios = response.data.filter(envio => envio.estado === 'pendiente');
            });
        }
        
    }
}
</script>