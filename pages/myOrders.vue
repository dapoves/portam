<template>
  <div>
    <GeneralHeader>Pedidos</GeneralHeader>
    <div class="flex justify-center py-4">
        <div class="flex justify-center my-4 bg-slate-200 rounded-xl w-fit" :class="{ 'h-auto': activeTab === 'active' }">
        <button 
          :class="{ 'bg-purple-950 text-white': activeTab === 'active' }"
          class="py-2 px-12 focus:outline-none rounded-xl font-semibold"
          @click="activeTab = 'active'"
        >
          Activos
        </button>
        <button 
          :class="{ 'bg-purple-950 text-white': activeTab === 'past' }"
          class="py-2 px-12 focus:outline-none rounded-xl font-semibold"
          @click="activeTab = 'past'"
        >
          Pasados
        </button>
      </div>
    </div>
    <div v-if="activeTab === 'active'">
        <PedidoCard v-for="pedido in pedidosActivos" :key="pedido.id" :pedido="pedido" />
      </div>
      <div v-if="activeTab === 'past'">
        <PedidoCard v-for="pedido in pedidosPasados" :key="pedido.id" :pedido="pedido" />
      </div>
  </div>
</template>
<script>
import PedidoService from '~/services/PedidoService';

export default {
    data() {
        return {
            userId: null,
            activeTab: 'active',
            pedidos: [],
            pedidosActivos: [],
            pedidosPasados: [],
        };
    },
    mounted() {
        this.userId = localStorage.getItem('user_id');
        if (this.userId) {
            PedidoService.getMisPedidos(this.userId).then((response) => {
                this.pedidos = response.data;
                this.pedidosActivos = this.pedidos.filter(pedido => 
                    pedido.estado == 'pendiente' || 
                    pedido.estado == 'aceptado' || 
                    pedido.estado == 'en camino' || 
                    (pedido.estado == 'entregado' || pedido.estado == 'cancelado') && 
                    new Date(pedido.fechaPedido).toDateString() === new Date().toDateString()
                );
                this.pedidosPasados = this.pedidos.filter(pedido => 
                    (pedido.estado === 'cancelado' || pedido.estado === 'entregado') && 
                    new Date(pedido.fechaPedido).toDateString() !== new Date().toDateString()
                );
            });
        }
    }
}
</script>