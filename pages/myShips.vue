<template>
    <div>
        <GeneralHeader>Envíos</GeneralHeader>
        <div class="flex justify-center py-4">
            <div class="flex justify-center my-4 bg-slate-200 rounded-xl w-fit"
                :class="{ 'h-auto': activeTab === 'active' }">
                <button :class="{ 'bg-purple-950 text-white': activeTab === 'active' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'active'">
                    Activos
                </button>
                <button :class="{ 'bg-purple-950 text-white': activeTab === 'past' }"
                    class="py-2 px-12 focus:outline-none rounded-xl font-semibold" @click="activeTab = 'past'">
                    Pasados
                </button>
            </div>
        </div>
        <div v-if="activeTab === 'active'">
            <ShipCard v-for="envio in enviosActivos" :key="envio.id" :envio="envio" />
        </div>
        <div v-if="activeTab === 'past'">
            <ShipCard v-for="envio in enviosPasados" :key="envio.id" :envio="envio" />
        </div>
    </div>
</template>

<script>
import EnvioService from '~/services/EnvioService';

export default {
    data() {
        return {
            userId: null,
            activeTab: 'active',
            envios: [],
            enviosActivos: [],
            enviosPasados: [],
        };
    },
    mounted() {
        this.userId = localStorage.getItem('user_id');
        if (this.userId) {
            EnvioService.getMisEnvios(this.userId).then((response) => {
                this.envios = response.data;

                this.enviosActivos = this.envios.filter(envio => !envio.fechaEntrega && envio.estado !== 'cancelado');
                this.enviosPasados = this.envios.filter(envio => envio.fechaEntrega || envio.estado === 'cancelado');
            });
        }
    }
}
</script>