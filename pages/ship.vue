<template>
    <div>
        <GeneralHeader>Envío Personalizado</GeneralHeader>
        <div class="w-4/5 mx-auto mt-10">
            <p class="font-semibold">¿Que tipo de envío necesitas?</p>
            <div class="my-6 flex" style="justify-content: space-around;">
                <div class="text-center cursor-pointer transition-all" @click="setTipoEnvio('pesado')"
                    :class="{ 'scale-110': tipoEnvio === 'pesado', 'opacity-50': tipoEnvio !== 'pesado' }">
                    <div class="bg-purple-700 rounded-full w-fit p-4 items-center shadow-lg">
                        <IconTruck color="white" stroke-width="2" :size="60" />
                    </div>
                    <p class="mt-3 text-[#9139BA] font-semibold">Pesado</p>
                </div>
                <div class="text-center cursor-pointer transition-all" @click="setTipoEnvio('ligero')"
                    :class="{ 'scale-110': tipoEnvio === 'ligero', 'opacity-50': tipoEnvio !== 'ligero' }">
                    <div class="bg-purple-700 rounded-full w-fit p-4 items-center shadow-lg">
                        <IconBike color="white" stroke-width="2" :size="60" />
                    </div>
                    <p class="mt-3 text-[#9139BA] font-semibold">Ligero</p>
                </div>
            </div>
            <p class="font-semibold pt-6 pb-1">Descripción del paquete:</p>
            <textarea v-model="descripcion" class="w-full rounded-lg border border-gray-300 p-2 mt-2" rows="2"
                placeholder="¿Qué quieres enviar?"></textarea>
            <p class="font-semibold pt-5 pb-1">Dirección de Recogida</p>
            
            <div class="flex">
                <select v-model="poblacionOrigen"
                    class=" text-gray-800 rounded-lg border border-gray-300 p-2 mt-2">
                    <option v-for="poblacion in poblaciones" :value="poblacion.id">{{ poblacion.nombre }}</option>
                </select>
                <input v-model="direccionRecogida" type="text" class="ml-2 w-full rounded-lg border border-gray-300 p-2 mt-2"
                    placeholder="¿Dónde quieres que recogamos tu pedido?">
            </div>

            <p class="font-semibold pt-6 pb-1">Dirección de Entrega</p>
            <div class="flex">
                <select v-model="poblacionDestino"
                    class=" text-gray-800 rounded-lg border border-gray-300 p-2 mt-2">
                    <option v-for="poblacion in poblaciones" :value="poblacion.id">{{ poblacion.nombre }}</option>
                </select>
                <input v-model="direccionEntrega" type="text" class="ml-2 w-full rounded-lg border border-gray-300 p-2 mt-2"
                    placeholder="¿Dónde quieres que llevemos tu paquete?">
            </div>
        
            <div class="pt-6 flex">
                <div class="mr-8     ">
                    <p class="font-semibold pb-1">Estimación de peso</p>
                    <select v-model="estimacionPeso"
                        class=" text-gray-800 rounded-lg border border-gray-300 p-2 mt-2">
                        <option value="1">0-2kg</option>
                        <option value="2">2-5kg</option>
                        <option value="5">5-10kg</option>
                        <option value="10">+ 10kg</option>
                    </select>
                </div>
                <div class="ml-8">
                    <p class="font-semibold pb-1">Tiempo de espera </p>
                    <select v-model="tiempoEspera"
                        class="text-gray-800 rounded-lg border border-gray-300 p-2 mt-2">
                        <option value="antes posible">Lo antes posible</option>
                        <option selected value="hoy">Para Hoy</option>
                        <option value="manyana">Para Mañana</option>
                        <option value="semana">Para esta Semana</option>
                        <option value="mes">Para este mes</option>
                    </select>
                </div>
            </div>
            <p class="font-semibold pt-6 pb-1">Instrucciones adicionales:</p>
            <textarea v-model="instrucciones" class="w-full rounded-lg border border-gray-300 p-2 mt-2" rows="4"
                placeholder="¿Alguna indicación adicional para el repartidor?"></textarea>
            <button
                v-if="tipoEnvio && descripcion && direccionRecogida && poblacionDestino && poblacionOrigen && direccionEntrega && estimacionPeso && tiempoEspera"
                class="align-middle mt-6 select-none bg-purple-600 font-noto-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-4 px-6 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                type="button" data-ripple-light="true" @click="checkout">
                Pagar {{ precioTotal }}€
            </button>

        </div>

    </div>
</template>

<script>
import EstablecimientoService from '~/services/EstablecimientoService';
import EnvioService from '~/services/EnvioService';

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
            poblacionOrigen: '',
            poblacionDestino: '',
            poblaciones: [],
        };
    },
    computed: {
        //esto deberia ser mediante API
        precioTotal() {
            const preciosPeso = {
                '1': 1.50,
                '2': 3.50,
                '5': 6.50,
                '10': 10.50
            };
            const preciosTiempo = {
                'antes posible': 4,
                'hoy': 1.50,
                'manyana': 0.75,
                'semana': 0.50,
                'mes': 0.10
            };

            let precio = (preciosPeso[this.estimacionPeso] || 0) + (preciosTiempo[this.tiempoEspera] || 0);
            if (this.poblacionOrigen !== this.poblacionDestino) {
                precio += 1.00;
            }

            return precio;
        }
    },
    methods: {
        setTipoEnvio(tipo) {
            this.tipoEnvio = tipo;
        },
        checkout() {
            let vm = this;
            let envio = new FormData();
            envio.append('tipo', vm.tipoEnvio);
            console.log(vm.tipoEnvio);
            envio.append('descripcion', vm.descripcion);
            envio.append('direccionRecogida', vm.direccionRecogida);
            envio.append('direccionEntrega', vm.direccionEntrega);
            envio.append('destino_id', vm.poblacionDestino);
            envio.append('origen_id', vm.poblacionOrigen);
            envio.append('cliente_id', localStorage.getItem('user_id'));
            envio.append('tarjeta_id', 1);
            envio.append('peso', vm.estimacionPeso);
            envio.append('espera', vm.tiempoEspera);
            console.log(vm.tiempoEspera);
            envio.append('indicaciones', vm.instrucciones);
            envio.append('precioTotal', vm.precioTotal);

            EnvioService.createEnvio(envio).then((response) => {
                console.log(response);
                if (response.data.status === 'ok'){
                    this.$swal({
                        title: 'Envío solicitado con éxito',
                        text: 'Espere hasta que un repartidor acepte la solicitud',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigateTo('/myShips');  
                } else {
                    this.$swal({
                        title: 'Error',
                        text: 'No se ha podido solicitar el envío',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }).catch((error) => {
                console.log(error.response.data.message);
            });

        } 
    },
    async mounted() {
        const response = await EstablecimientoService.getPoblaciones();
        this.poblaciones = response.data;
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
