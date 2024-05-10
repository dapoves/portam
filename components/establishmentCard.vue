<template>
  <div class="w-3/4 flex justify-center mx-auto mt-6">
    <!-- This is an example component -->
    <div class='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
      <div class='max-w-md mx-auto'>
        <div class='h-[236px]'
          style='background-image:url(https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=2000&t=st=1678041911~exp=1678042511~hmac=e4aa55e70f8c231d4d23832a611004f86eeb3b6ca067b3fa0c374ac78fe7aba6);background-size:cover;background-position:center'>
        </div>
        <div class='p-4 sm:p-6'>
          <p class='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{{ stablish.nombre }}</p>
          <div class='flex justify-between text-[#78828A]'>
            <div class='flex'>
              <IconMapPin :size="20" class='mt-3 mr-1' />
              <p class='mt-3 text-base'>{{ stablish.poblacion_id }}</p>
              <p class='mt-3 ml-2 mr-2 text-base'> | </p>
              <IconStar :size="20" class='mt-3 mr-1 text-yellow-400' fill="#facc15" />
              <p class='mt-3 text-base'>{{ stablish.poblacion_id }}</p>
            </div>
            <IconHeart :size="20" class='mt-3 mr-1 text-purple-800' fill="#6b21a8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  stablish: Object
})
</script>