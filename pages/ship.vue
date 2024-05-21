<template>
    <div>
      <GeneralHeader>Envío Personalizado</GeneralHeader>
      <div class="w-4/5 mx-auto mt-10">
        <p class="font-semibold">¿Que tipo de envío necesitas?</p>
        <div class="my-6 flex" style="justify-content: space-around;">
            <div class="text-center cursor-pointer transition-all" @click="setTipoEnvio('Pesado')" :class="{ 'scale-110': tipoEnvio === 'Pesado', 'opacity-50': tipoEnvio !== 'Pesado' }">
                <div class="bg-purple-700 rounded-full w-fit p-4 items-center shadow-lg">
                    <IconTruck color="white" stroke-width="2" :size="60" />
                </div>
                <p class="mt-3 text-[#9139BA] font-semibold">Pesado</p>
            </div>
            <div class="text-center cursor-pointer transition-all" @click="setTipoEnvio('Ligero')" :class="{ 'scale-110': tipoEnvio === 'Ligero', 'opacity-50': tipoEnvio !== 'Ligero' }">
                <div class="bg-purple-700 rounded-full w-fit p-4 items-center shadow-lg">
                    <IconBike color="white" stroke-width="2" :size="60" />
                </div>
                <p class="mt-3 text-[#9139BA] font-semibold">Ligero</p>
            </div>
        </div>
        <p class="font-semibold pt-6">Dirección de Recogida</p>
        <input type="text" class="w-full rounded-lg border border-gray-300 p-2 mt-2" placeholder="Dirección de recogida">
      </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            tipoEnvio: '',
        };
    },
    methods: {
        setTipoEnvio(tipo) {
            this.tipoEnvio = tipo;
        }
    }
}

</script>

<style scoped>
.scale-110 {
    transform: scale(1.2);
}
.transition-all {
    transition: all 0.4s ease;
}
.opacity-50 {
    opacity: 0.5;
}
</style>