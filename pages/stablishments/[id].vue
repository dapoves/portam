<template>
    <div>
        <div>
            <img class="w-full h-40 object-cover absolute top-0" :src="`http://127.0.0.1:8000/storage/establecimientos/`+ stablish.imagen" />
            <nav
                class="mt-20 flex justify-between sticky top-0 z-10 block w-full max-w-full rounded-t-3xl px-4 py-8 bg-white h-max backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-6">
                <NuxtLink @click="$router.go(-1)" class="cursor-pointer">
                    <IconChevronLeft class="ml-8" stroke-width="2" />
                </NuxtLink>
                <p class="text-2xl">{{ stablish.nombre }}</p>
                <IconPhone class="mr-8" />
            </nav>
        </div>
        <div class="px-4 py-2 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="product in products" :key="product.id"
                class="group relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-all duration-200">
                <div class='h-[120px] rounded-t-xl transition-all duration-200 group-hover:opacity-50'
                    :style="'background-image:url(http://127.0.0.1:8000/storage/productos/' + product.imagen + ');background-size:cover;background-position:center'">
                </div>

                <div class="p-4 group-hover:opacity-50 transition-all duration-200">
                    <div class="mb-2 flex items-center justify-between">
                        <p class="block text-base font-medium text-blue-gray-900 antialiased">
                            {{ product.nombre }}
                        </p>
                        <p class="block text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {{ product.precio }}€
                        </p>
                    </div>
                    <p class="block text-sm sm:text-xs font-normal text-gray-700 text-justify antialiased opacity-75">
                        {{ product.descripcion }}
                    </p>
                </div>
                <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div class="bg-white p-4 rounded-lg">
                        <p class="mb-4 text-center">¿Añadir {{ product.nombre }} al pedido?</p>
                        <button
                            class="block w-full select-none rounded-lg bg-purple-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button" @click=addProduct(product)>
                            AÑADIR {{ product.precio }}€
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="order.length > 0" @click="checkout"
            class="w-2/3 flex justify-between items-center mx-auto bg-purple-700 rounded-3xl text-white fixed bottom-0 p-1 inset-x-0 m-8 transform transition-all hover:scale-105 cursor-pointer">
            <div
                class="bg-white rounded-full h-10 w-10 text-base font-bold text-black flex items-center justify-center">
                <p>x{{ order.length }}</p>
            </div>
            <p>{{ parseFloat(precioTotal.toFixed(2)) }}€</p>
            <div class="flex items-center">
                <p class="text-sm">Ir al Pedido</p>
                <IconChevronRight color="white" stroke-width="2" />
            </div>
        </div>
    </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import EstablecimientoService from '@/services/EstablecimientoService';
import { useOrderStore } from '~/stores/order';

export default {
  data() {
    return {
      order: [],
      precioTotal: 0,
      stablish: {},
      products: [],
      orderStore: useOrderStore(),
    };
  },
  methods: {
    getStablishment() {
      EstablecimientoService.getEstablecimiento(this.$route.params.id).then((response) => {
        this.stablish = response.data;
      });
    },
    getProducts() {
      EstablecimientoService.getProductos(this.$route.params.id).then((response) => {
        this.products = response.data;
      });
    },
    addProduct(product) {
      this.order.push(product);
      this.precioTotal += parseFloat(product.precio.toFixed(2));
    },
    checkout() {
      this.orderStore.setProducts(this.order);
      this.orderStore.setStablish(this.stablish);
      this.orderStore.setSubtotal(this.precioTotal);
      this.orderStore.setCosteEnvio(this.stablish.costeEnvio);
      navigateTo('/order');
    },
  },
  
  mounted() {
    this.getStablishment();
    this.getProducts();
  },
};
</script>
