<template>
    <div>
        <header class="m-6 pt-5 flex justify-between items-center text-2xl font-noto-sans" >
            <NuxtLink to="/menu">
                <IconAlignJustify :size="30"/>
            </NuxtLink>
            <div class="flex items-center px-6 w-full">
                <h1 class="text-neutral-600 mb-1">Les valls </h1>
                <IconChevronRight color="gray" stroke-width="2"/>
            </div>
            <div v-if="!isSocio" @click="toDeliverys" class="cursor-pointer">
                <IconBike :size="30"/>
            </div>
            <NuxtLink v-if="isSocio" to="/deliverys">
                <IconScrollText :size="30"/>
            </NuxtLink>
        </header>
        </div>
</template>

<script>
import { isSocio } from '~/funciones/authorization.js';

export default {
   computed: {
       isSocio() {
           return isSocio();
       }
   },
    methods: {
         toDeliverys() {
              if (localStorage.getItem('user_role') === 'repartidor') {
                  navigateTo('/deliverys');
              } else {
                this.$swal({
                    title: 'Lo sentimos, no eres repartidor',
                    text: 'No puedes acceder a esta sección',
                    imageUrl: 'https://damian.jdfs.dev/storage/emojis/crying.png',
                    imageAlt: 'Error Image'
                });
              }
         }
    }
}
</script>

