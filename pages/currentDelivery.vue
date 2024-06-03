<template>
    <div>
        <GeneralHeader>Entrega en Curso</GeneralHeader>
        <div class="flex justify-center py-4">
            <div class="flex justify-center my-4 bg-slate-200 rounded-xl w-fit"
                :class="{ 'h-auto': activeTab === 'active' }">
                <button :class="{ 'bg-tertiary text-white': activeTab === 'active' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'active'">
                    Pedido
                </button>
                <button :class="{ 'bg-tertiary text-white': activeTab === 'past' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'past'">
                    Envios
                </button>
            </div>
        </div>
        <CurrentPedido v-if="activeTab === 'active'"></CurrentPedido>
        <CurrentEnvio v-if="activeTab === 'past'"></CurrentEnvio>
    </div>
</template>
<script>


export default {
    data() {
        return {
            activeTab: 'active',
        };
    }
}
</script>