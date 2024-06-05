<template>
    <div>
        <GeneralHeader>{{ stablishment.nombre }}</GeneralHeader>
        <div class="h-screen text-center">
            <img @click="updateImagen" :src="stablishImagen" :alt="stablishment.nombre"
                class="w-full h-1/5 object-cover">

            <input type="text" @change="updateStablishment('nombre', stablishment.nombre)"
                class="p-2 mt-4 rounded-lg text-center md:text-2xl text-xl font-bold" v-model="stablishment.nombre">
            <div class="flex flex-wrap justify-around px-6">
                <div class="flex m-2">
                    <IconMap-Pinned color="#9139BA" class="mx-2" stroke-width="2" />
                    <input type="text" @change="updateStablishment('direccion', stablishment.direccion)"
                        class="text-lg w-[190px]" v-model="stablishment.direccion">
                </div>
                <div class="flex m-2">
                    <IconStore color="#9139BA" class="mx-2" stroke-width="2" />
                    <select v-model="stablishment.categoria_id"
                        @change="updateStablishment('categoria_id', stablishment.categoria_id)"
                        class="text-lg w-[190px]">
                        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{
                            categoria.nombre }}</option>
                    </select>
                </div>
                <div class="flex">
                    <div class="flex m-2 items-center">
                        <IconClock color="#9139BA" class="mx-2" stroke-width="2" />
                        <div class="flex items-center">
                            <input type="number"
                                @change="updateStablishment('tiempoPreparacion', stablishment.tiempoPreparacion)"
                                class="text-lg w-[36px]" v-model="stablishment.tiempoPreparacion">
                            <span class="text-lg">min</span>
                        </div>
                    </div>
                    <div class="flex m-2 items-center">
                        <IconBike color="#9139BA" class="mx-2" stroke-width="2" />
                        <div class="flex items-center">
                            <input type="number" @change="updateStablishment('costeEnvio', stablishment.costeEnvio)"
                                class="text-lg w-[50px]" v-model="stablishment.costeEnvio">
                            <span class="text-lg">€</span>
                        </div>
                    </div>
                </div>

                <div class="flex m-2">
                    <IconPhone color="#9139BA" class="mx-2" stroke-width="2" />
                    <input type="number" @change="updateStablishment('telefono', stablishment.telefono)"
                        class="text-lg w-[190px]" v-model="stablishment.telefono">
                </div>
            </div>
            <div @click="createProducto"
                class="bg-primary hover:bg-primary-dark text-white rounded-lg py-2 px-6 mt-4 w-1/2 mx-auto cursor-pointer">
                Añadir Producto
            </div>

            <hr class="border-t-2 my-4">
            <div class="px-4 py-2 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div v-for="product in productos" :key="product.id" 
                    @mousedown="startHold(product.id)"
                    @mouseup="stopHold" @mouseleave="stopHold"
                    class="producto group relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
                    <div @click="updateImagenProduct(product.id)" class='h-[120px] rounded-t-xl cursor-pointer'
                        :style="'background-image:url(http://127.0.0.1:8000/storage/productos/' + product.imagen + ');background-size:cover;background-position:center'">
                    </div>

                    <div class="p-4 ">
                        <div class="mb-2 flex flex-wrap items-center justify-between">
                            <input type="text" @change="updateProduct(product.id, 'nombre', product.nombre)"
                                class="block text-base font-medium text-blue-gray-900 antialiased w-full"
                                v-model="product.nombre">
                            <div class="flex">
                                <input type="number" @change="updateProduct(product.id, 'precio', product.precio)"
                                    class="block text-base w-[50px] font-medium text-blue-gray-900 antialiased"
                                    v-model="product.precio">
                                <p class="text-blue-gray-900">€</p>
                            </div>
                        </div>
                        <textarea @change="updateProduct(product.id, 'descripcion', product.descripcion)"
                            class="block text-sm font-medium text-blue-gray-900 antialiased w-full h-[70px]"
                            v-model="product.descripcion">
                        </textarea>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
import UserService from '~/services/UserService';
import EstablecimientoService from '~/services/EstablecimientoService';

export default {
    data() {
        return {
            stablishment: {},
            categorias: [],
            productos: [],
            holdInterval: null,
        };
    },
    async mounted() {
        const response = await UserService.getUser(localStorage.getItem('user_id'));
        EstablecimientoService.getEstablecimiento(response.data.establecimiento_id).then((response) => {
            this.stablishment = response.data;
        });

        EstablecimientoService.getCategorias().then((response) => {
            this.categorias = response.data;
        });

        EstablecimientoService.getProductos(response.data.establecimiento_id).then((response) => {
            this.productos = response.data;
        });
    },
    computed: {
        stablishImagen() {
            const baseUrl = 'http://127.0.0.1:8000/storage/establecimientos/';
            return this.stablishment.imagen ? baseUrl + this.stablishment.imagen : 'https://via.placeholder.com/150';
        }
    },
    methods: {
        updateImagen() {
            this.$swal({
                title: 'Actualizar imagen',
                text: '¿Quieres actualizar la imagen de tu establecimiento?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                input: 'file',
                inputAttributes: {
                    accept: 'image/*'
                },
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debes seleccionar una imagen';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('imagen', result.value);
                    formData.append('_method', 'PUT');

                    EstablecimientoService.updateEstablecimiento(this.stablishment.id, formData).then((response) => {
                        this.stablishment = response.data.establecimiento;
                    });

                }
            });
        },
        updateImagenProduct(id) {
            this.$swal({
                title: 'Actualizar imagen',
                text: '¿Quieres actualizar la imagen de tu producto?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#9139BA',
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                input: 'file',
                inputAttributes: {
                    accept: 'image/*'
                },
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debes seleccionar una imagen';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('imagen', result.value);
                    formData.append('_method', 'PUT');

                    EstablecimientoService.updateProducto(id, formData).then((response) => {
                        this.productos[this.productos.findIndex(product => product.id === id)] = response.data.producto;
                    });
                }
            });
        },
        updateStablishment(key, value) {
            const formData = new FormData();
            formData.append(key, value);
            formData.append('_method', 'PUT');
            EstablecimientoService.updateEstablecimiento(this.stablishment.id, formData).then((response) => {
                console.log(response.data);
                if (response.data.status == 'ok') {
                    this.$swal({
                        text: '¡Establecimiento actualizado!',
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        height: '40px',
                        width: '300px',
                        allowOutsideClick: true,
                        background: '#86efac',
                        backdrop: false,
                    });

                }
                this.stablishment = response.data.establecimiento;
            });
        },
        updateProduct(id, key, value) {
            const formData = new FormData();
            formData.append(key, value);
            formData.append('_method', 'PUT');
            EstablecimientoService.updateProducto(id, formData).then((response) => {
                if (response.data.status == 'ok') {
                    this.$swal({
                        text: '¡Producto actualizado!',
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        height: '40px',
                        width: '300px',
                        allowOutsideClick: true,
                        background: '#86efac',
                        backdrop: false,
                    });
                }
            });
        },
        createProducto() {
            this.$swal({
                title: 'Añadir producto',
                html: '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
                    '<input id="precio" type="number" class="swal2-input" placeholder="Precio">' +
                    '<textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>' +
                    '<input id="imagen" type="file" class="swal2-file" accept="image/*">',
                confirmButtonText: 'Añadir',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#9139BA',
                preConfirm: () => {
                    const nombre = document.getElementById('nombre').value;
                    const precio = document.getElementById('precio').value;
                    const descripcion = document.getElementById('descripcion').value;
                    const imagen = document.getElementById('imagen').files[0];
                    return {
                        nombre: nombre,
                        precio: precio,
                        descripcion: descripcion,
                        imagen: imagen
                    };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('nombre', result.value.nombre);
                    formData.append('precio', result.value.precio);
                    formData.append('descripcion', result.value.descripcion);
                    formData.append('imagen', result.value.imagen);
                    formData.append('establecimiento_id', this.stablishment.id);

                    EstablecimientoService.createProducto(formData).then((response) => {
                        if (response.data.status === 'ok') {
                            this.$swal({
                                text: '¡Producto añadido!',
                                position: 'bottom-end',
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                                height: '40px',
                                width: '300px',
                                allowOutsideClick: true,
                                background: '#86efac',
                                backdrop: false,
                            });
                            this.productos.push(response.data.producto);
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.$swal('Error', error.response.data.message, 'error');
                    });
                }
            });
        },
        startHold(productId) {
            this.holdInterval = setTimeout(() => {
                this.$swal.fire({
                    title: '¿Quieres borrar este producto?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Borrar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        EstablecimientoService.deleteProducto(productId).then((response) => {
                            if (response.data.status === 'ok') {
                                this.productos = this.productos.filter(product => product.id !== productId);
                                this.$swal({
                                    text: '¡Producto eliminado!',
                                    position: 'bottom-end',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    timerProgressBar: true,
                                    height: '40px',
                                    width: '300px',
                                    allowOutsideClick: true,
                                    background: '#86efac',
                                    backdrop: false,
                                });
                            }
                        });
                    }
                });
            }, 1400);
        },
        stopHold() {
            clearTimeout(this.holdInterval);
        }
    }
}

</script>
<style scoped>

@keyframes tambalear {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(-5deg); }
  20% { transform: rotate(5deg); }
  30% { transform: rotate(-5deg); }
  40% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
  60% { transform: rotate(5deg); }
  70% { transform: rotate(-5deg); }
  80% { transform: rotate(5deg); }
  90% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}

.producto:active {
animation: tambalear 1.5s ease-in 0.2s infinite;
}

</style>