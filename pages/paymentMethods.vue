<template>
    <div>
        <GeneralHeader>Métodos de Pago</GeneralHeader>
        <div class="w-4/5 mx-auto py-10">
            <div v-for="tarjeta in tarjetas" :key="tarjeta.id" @click="seleccionarTarjeta(tarjeta.id)">
                <div
                    :class="`text-white rounded-lg shadow-lg cursor-pointer py-3 pl-7 pr-4 max-w-md mx-auto mb-6 transition-transform duration-500 ${tarjeta.tipo === 'visa' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : tarjeta.tipo === 'american_express' ? 'bg-gradient-to-r from-slate-900 to-yellow-500' : 'bg-gradient-to-r from-yellow-500 to-red-500'} ${tarjetasSeleccionadas.includes(tarjeta.id) ? 'scale-110 shadow-2xl' : ''}`">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="block text-sm font-light">Número Tarjeta</p>
                            <p class="text-xl font-semibold tracking-widest">{{ tarjeta.numero }}</p>
                        </div>
                        <img :src="`http://127.0.0.1:8000/storage/tarjetas/${tarjeta.tipo}.png`" alt="Card Logo"
                            class="h-10">
                    </div>
                    <div class="mt-1">
                        <p class="block text-sm font-light">Titular</p>
                        <p class="text-xl font-semibold">{{ tarjeta.titular }}</p>
                    </div>
                    <div class="mt-1 flex justify-between items-center">
                        <div>
                            <p class="block text-sm font-light">Caducidad</p>
                            <p class="text-lg font-semibold">{{ tarjeta.caducidad }}</p>
                        </div>
                        <div v-if="tarjeta.predeterminada" class="bg-green-500 text-white rounded-full px-2 flex items-center" style="height: 20px;">
                            <p class="m-0 leading-3 text-xs">Predeterminada</p>
                        </div>

                        <div class="mr-3">
                            <p class="block text-sm font-light">CVV</p>
                            <p class="text-lg font-semibold">{{ tarjeta.cvv }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div v-if="tarjetasSeleccionadas.length" @click="eliminarTarjetas"
                class="fixed bottom-10 left-10 bg-red-500 p-3 rounded-full shadow-lg">
                <IconTrash2 color="white" size="35" />
            </div>
            <div @click="addTarjeta" v-if="!tarjetasSeleccionadas.length"
                class="fixed bottom-10 right-10 bg-purple-800 p-3 rounded-full shadow-lg">
                <IconPlus color="white" size="35" stroke-width="3" />
            </div>
            <div @click="setPredeterminada" v-if="tarjetasSeleccionadas.length === 1"
                class="fixed bottom-10 right-10 bg-blue-800 p-3 rounded-full shadow-lg">
                <IconEdit color="white" size="35" stroke-width="3" />
            </div>
        </div>
    </div>
</template>
<script>
import TarjetaService from '~/services/TarjetaService';

export default {
    data() {
        return {
            tarjetas: [],
            tarjetasSeleccionadas: [],
        };
    },
    mounted() {
        TarjetaService.getMisTarjetas(localStorage.getItem('user_id')).then(response => {
            this.tarjetas = response.data;
        });
    },
    methods: {
        seleccionarTarjeta(idTarjeta) {
            const index = this.tarjetasSeleccionadas.indexOf(idTarjeta);
            if (index !== -1) {
                this.tarjetasSeleccionadas.splice(index, 1);
            } else {
                this.tarjetasSeleccionadas.push(idTarjeta);
            }
        },
        eliminarTarjetas() {
            this.$swal({
                title: '¿Seguro que quieres eliminar las tarjetas seleccionadas?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.tarjetasSeleccionadas.forEach(idTarjeta => {
                        TarjetaService.deleteTarjeta(idTarjeta).then(() => {
                            this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.id !== idTarjeta);
                        });
                    });
                    this.tarjetasSeleccionadas = [];
                }
            });
        },
        addTarjeta() {
            this.$swal.fire({
                title: 'Añadir nueva tarjeta',
                html:
                    '<input id="titular" type="text" style="border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; margin-top: 15px;" placeholder="Titular">' +
                    '<input id="numero" type="number" style="border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; margin-top: 15px;" placeholder="Número de tarjeta">' +
                    '<input id="caducidad" type="text" style="border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; margin-top: 15px;" placeholder="Fecha de vencimiento">' +
                    '<br>' +
                    '<input id="cvv" type="number" style="border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; margin-top: 15px; max-width: 75px; margin: 15px" placeholder="CVV">' +
                    '<select id="tipo" style="border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; margin-top: 15px;">' +
                    '<option value="">Tipo de tarjeta</option>' +
                    '<option value="visa">VISA</option>' +
                    '<option value="mastercard">MasterCard</option>' +
                    '<option value="american_express">American Express</option>' +
                    '</select>',
                focusConfirm: false,
                confirmButtonColor: '#a855f7',
                confirmButtonText: 'Añadir',
                preConfirm: () => {
                    return [
                        document.getElementById('titular').value,
                        document.getElementById('numero').value,
                        document.getElementById('caducidad').value,
                        document.getElementById('cvv').value,
                        document.getElementById('tipo').value
                    ]
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const [titular, numeroTarjeta, fechaVencimiento, cvv, tipo] = result.value;
                    const fm = new FormData();
                    fm.append('titular', titular);
                    fm.append('numero', numeroTarjeta);
                    fm.append('caducidad', fechaVencimiento);
                    fm.append('cvv', cvv);
                    fm.append('tipo', tipo);
                    fm.append('user_id', localStorage.getItem('user_id'));

                    TarjetaService.createTarjeta(fm).then(response => {
                        if (response.data.status === 'ok') {
                            this.$swal.fire({
                                title: 'Tarjeta añadida',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false,
                            });
                            this.tarjetas.push(response.data.tarjeta);
                        }
                    });
                }
            });
        },
        setPredeterminada() {
            this.$swal.fire({
                title: '¿Quieres establecer esta tarjeta como predeterminada?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#a855f7',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    TarjetaService.setPredeterminada(this.tarjetasSeleccionadas[0]).then(() => {
                        this.tarjetas.forEach(tarjeta => {
                            tarjeta.predeterminada = tarjeta.id === this.tarjetasSeleccionadas[0];
                        });
                        this.tarjetasSeleccionadas = [];
                    });
                }
            });
        }
    }


}
</script>