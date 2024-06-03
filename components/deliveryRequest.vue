<template>
    <div class="w-full max-w-lg mx-auto p-4 sm:p-4">
        <div class="border border-gray-300 rounded-lg bg-white cursor-pointer" @click="toggleDetails">
            <div
                class="flex items-start sm:items-center justify-between p-4 border-b border-gray-300">
                <div>
                    <h2 class="text-xl font-semibold">Entrega para {{ nombre }}</h2>
                    <p class="text-gray-500">{{ envio.direccionEntrega }}, {{ codigoPostalDestino }}</p>
                </div>
                <div class="text-right sm:mt-0">
                    <div class="dark:text-primary text-xl font-semibold">{{ envio.precioTotal }}€</div>
                    <p class="text-sm text-gray-500">{{ tipo }}, {{ envio.espera }}</p>
                </div>
            </div>
            <div v-if="showDetails" class="p-4">
                <div class="grid gap-4">
                    <div>
                        <label class="font-medium">Descripción</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.descripcion }}</div>
                    </div>
                    <div>
                        <label class="font-medium">Instrucciones</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.indicaciones || 'Sin instrucciones' }}
                        </div>
                    </div>
                    <div>
                        <label class="font-medium">Peso</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.peso }}</div>
                    </div>
                    <div>
                        <label class="font-medium">Dirección de Recogida</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.direccionRecogida }}, {{ poblacionOrigen }} {{ codigoPostalOrigen }}</div>
                    </div>
                    <div>
                        <label class="font-medium">Dirección de Entrega</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.direccionEntrega }}, {{ poblacionDestino}} {{ codigoPostalDestino }}</div>
                    </div>
                    <div>
                        <label class="font-medium">Fecha de Pedido</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.fechaPedido }}</div>
                    </div>
                    <div>
                        <label class="font-medium">Tiempo de Espera</label>
                        <div class="text-gray-500 dark:text-gray-400">{{ envio.espera }}</div>
                    </div>
                </div>
            </div>
            <div v-if="showButtons" class="p-4 flex flex-col sm:flex-row justify-center gap-2 border-t border-gray-300">
                <button @click="repartirEnvio"
                    class="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Repartir
                    por {{ envio.precioTotal}}€</button>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '~/services/UserService';
import EstablecimientoService from '~/services/EstablecimientoService';
import RepartidorService from '~/services/RepartidorService';


export default {
    props: {
        envio: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showDetails: false,
            showButtons: false,
            nombre: '',
            poblacionOrigen: '',
            poblacionDestino: '',
            codigoPostalOrigen: '',
            codigoPostalDestino: '',
            tipo: '',
        };
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
            this.showButtons = !this.showButtons;
        },
        repartirEnvio() {
            this.$swal({
                title: '¿Seguro que quieres realizar este envío?',
                text: 'Deberás recoger el paquete en la dirección de recogida y entregarlo en la dirección de entrega. Asegúrate de confirmar tanto la recogida como la entrega en la aplicación',
                showCancelButton: true,
                confirmButtonText: 'Repartir',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#9139BA',
            })
            .then((confirm) => {
                if (confirm.isConfirmed) {
                    let data = new FormData();
                    data.append('repartidor_id', localStorage.getItem('user_id'));
                    data.append('envio_id', this.envio.id);
                    RepartidorService.repartirEnvio(data).then((response) => {
                        this.$swal({
                            title: 'Envio asignado',
                            text: '¡Ahora puedes actualizar el estado del envio en curso!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2500,
                        })

                        navigateTo('/currentDelivery');
                    });
                }
            });
        }
    },
    mounted() {
        UserService.getUser(this.envio.cliente_id).then((response) => {
            this.nombre = response.data.nombre;
        });

        EstablecimientoService.getPoblacion(this.envio.origen_id).then((response) => {
            this.poblacionOrigen = response.data.nombre;
            this.codigoPostalOrigen = response.data.codigoPostal;
        });

        EstablecimientoService.getPoblacion(this.envio.destino_id).then((response) => {
            this.poblacionDestino = response.data.nombre;
            this.codigoPostalDestino = response.data.codigoPostal;
        });

        this.tipo = this.envio.tipo.charAt(0).toUpperCase() + this.envio.tipo.slice(1);
        switch(this.envio.espera) {
            case 'antes posible':
                this.envio.espera = ', para lo antes posible';
                break;
            case 'hoy':
                this.envio.espera = 'para hoy';
                break;
            case 'manyana':
                this.envio.espera = 'para mañana';
                break;
            case 'semana':
                this.envio.espera = 'para esta semana';
                break;
            case 'mes':
                this.envio.espera = 'para este mes';
                break;    
        }
    },
};
</script>