<template>
    <div>
        <GeneralHeader>Envío Personalizado</GeneralHeader>
        <div class="w-4/5 mx-auto mt-10">
            <p class="font-semibold">¿Que tipo de envío necesitas?</p>
            <div class="my-6 flex" style="justify-content: space-around;">
                <div class="text-center cursor-pointer transition-all" @click="setTipoEnvio('Pesado')"
                    :class="{ 'scale-110': tipoEnvio === 'Pesado', 'opacity-50': tipoEnvio !== 'Pesado' }">
                    <div class="bg-purple-700 rounded-full w-fit p-4 items-center shadow-lg">
                        <IconTruck color="white" stroke-width="2" :size="60" />
                    </div>
                    <p class="mt-3 text-[#9139BA] font-semibold">Pesado</p>
                </div>
                <div class="text-center cursor-pointer transition-all" @click="setTipoEnvio('Ligero')"
                    :class="{ 'scale-110': tipoEnvio === 'Ligero', 'opacity-50': tipoEnvio !== 'Ligero' }">
                    <div class="bg-purple-700 rounded-full w-fit p-4 items-center shadow-lg">
                        <IconBike color="white" stroke-width="2" :size="60" />
                    </div>
                    <p class="mt-3 text-[#9139BA] font-semibold">Ligero</p>
                </div>
            </div>
            <p class="font-semibold pt-6 pb-1">Descripción del paquete:</p>
            <textarea v-model="descripcion" class="w-full rounded-lg border border-gray-300 p-2 mt-2" rows="2"
                placeholder="Describe aquí el paquete que quieres enviar"></textarea>
            <p class="font-semibold pt-5 pb-1">Dirección de Recogida</p>
            <input v-model="direccionRecogida" type="text" class="w-full rounded-lg border border-gray-300 p-2 mt-2"
                placeholder="¿Dónde quieres que recogamos tu pedido?">
            <p class="font-semibold pt-6 pb-1">Dirección de Entrega</p>
            <input v-model="direccionEntrega" type="text" class="w-full rounded-lg border border-gray-300 p-2 mt-2"
                placeholder="Dónde quieres que llevemos tu paquete?">
            <div class="pt-6 flex">
                <div class="mr-8     ">
                    <p class="font-semibold pb-1">Estimación de peso</p>
                    <select v-model="estimacionPeso"
                        class=" bg-gray-100 text-gray-800 rounded-lg border border-gray-300 p-2 mt-2">
                        <option value="1">0-2kg</option>
                        <option value="2">2-5kg</option>
                        <option value="5">5-10kg</option>
                        <option value="10">+ 10kg</option>
                    </select>
                </div>
                <div class="ml-8">
                    <p class="font-semibold pb-1">Tiempo de espera </p>
                    <select v-model="tiempoEspera"
                        class=" bg-gray-100 text-gray-800 rounded-lg border border-gray-300 p-2 mt-2">
                        <option value="0">Lo antes posible</option>
                        <option selected value="1">Para Hoy</option>
                        <option value="2">Para Mañana</option>
                        <option value="3">Para esta Semana</option>
                        <option value="4">Para este mes</option>
                    </select>
                </div>
            </div>
            <p class="font-semibold pt-6 pb-1">Instrucciones adicionales:</p>
            <textarea v-model="instrucciones" class="w-full rounded-lg border border-gray-300 p-2 mt-2" rows="4"
                placeholder="¿Alguna indicación adicional para el repartidor?"></textarea>
            <button
                v-if="tipoEnvio && descripcion && direccionRecogida && direccionEntrega && estimacionPeso && tiempoEspera"
                class="align-middle mt-6 select-none bg-purple-600 font-noto-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-4 px-6 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                type="button" data-ripple-light="true">
                Pagar {{ precioTotal }}€
            </button>

        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            tipoEnvio: '',
            descripcion: '',
            direccionRecogida: '',
            direccionEntrega: '',
            estimacionPeso: '',
            tiempoEspera: '',
            instrucciones: '',
        };
    },
    computed: {
        //esto deberia ser mediante API
        precioTotal() {
            const preciosPeso = {
                '1': 3,
                '2': 5,
                '5': 8,
                '10': 12
            };
            const preciosTiempo = {
                '0': 5,
                '1': 2.50,
                '2': 1.50,
                '3': 1,
                '4': 0.5
            };
            return (preciosPeso[this.estimacionPeso] || 0) + (preciosTiempo[this.tiempoEspera] || 0);
        }
    },
    methods: {
        setTipoEnvio(tipo) {
            this.tipoEnvio = tipo;
        }
    },
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