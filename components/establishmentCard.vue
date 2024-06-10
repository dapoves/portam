<template>
  <div class="w-full mx-auto pr-5 pl-5 flex justify-center mt-6">
    <NuxtLink :to="`/stablishments/${stablish.id}`" class='w-full max-w-md mx-auto bg-white rounded-3xl shadow hover:shadow-xl overflow-hidden'>
      <div class='max-w-md mx-auto'>
        <div class='h-[180px]'
        :style="`background-image:url(${imagenUrl});background-size:cover;background-position:center`">
        </div>
        <div class='p-4 sm:p-6'>
          <p class='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{{ stablish.nombre }}</p>
          <div class='flex justify-between text-[#78828A]'>
            <div class='flex'>
              <IconMapPin :size="20" class='mt-3 mr-1' />
              <p class='mt-3 text-base'>{{ poblacion }}</p>
              <p class='mt-3 ml-2 mr-2 text-base'> | </p>
              <IconStar :size="20" class='mt-3 mr-1 text-yellow-400' fill="#facc15" />
              <p class='mt-3 text-base'>{{ stablish.likes }} Likes</p>
            </div>
            <div @click.prevent="meGusta">
              <IconHeart :size="20" class='mt-3 mr-1 text-purple-800 heart-icon' :class="{ liked: isLiked, 'is-liked-animation': isLikedAnimation }" :fill="isLiked ? '#6b21a8' : 'white'"/>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EstablecimientoService from '@/services/EstablecimientoService';

const props = defineProps({
  stablish: Object
});

const baseUrl = 'https://damian.jdfs.dev/storage/establecimientos/';
let imagenUrl = baseUrl + props.stablish.imagen;
let poblacion = ref('');
let isLiked = ref(false);
let isLikedAnimation = ref(false);

function getPoblacion() {
  EstablecimientoService.getPoblacion(props.stablish.poblacion_id).then((response) => {
    poblacion.value = response.data.nombre;
  });
}

function setIsLiked() {
  if (typeof window !== 'undefined') {
    let userId = JSON.parse(localStorage.getItem('user_id'));
    EstablecimientoService.isLiked(userId, props.stablish.id).then((response) => {
      isLiked.value = response.data;
    });
  }
}

function meGusta() {
  if (typeof window !== 'undefined') {
    let userId = JSON.parse(localStorage.getItem('user_id'));
    let fm = new FormData();
    fm.append('establecimiento_id', props.stablish.id);
    fm.append('user_id', userId);
    EstablecimientoService.addLike(fm).then(() => {
      isLiked.value = !isLiked.value;
      isLikedAnimation.value = true;
      setTimeout(() => {
        isLikedAnimation.value = false;
      }, 500); // Duración de la animación
    });
  }
}

onMounted(getPoblacion);
onMounted(setIsLiked);
</script>

<style scoped>
@keyframes likeAnimation {
  0% {
    transform: scale(1);
    fill: white;
  }
  50% {
    transform: scale(1.4);
    fill: #6b21a8;
  }
  100% {
    transform: scale(1);
    fill: #6b21a8;
  }
}

.heart-icon {
  transition: fill 0.3s ease;
}

.heart-icon.liked {
  animation: likeAnimation 0.5s ease;
}
</style>
