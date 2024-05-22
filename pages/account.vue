<template>
  <div>
     <div class="w-full h-full absolute top-0 bg-purple-700"></div>
    <nav class="flex justify-between sticky top-0 z-10 block w-full max-w-full rounded-t-3xl px-4 py-8 bg-white h-max backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-6">
        <NuxtLink @click="$router.go(-1)" class="cursor-pointer">
            <IconChevronLeft class="ml-8" stroke-width="2" />
        </NuxtLink>
        <p class="text-2xl text-white">¡Hola Darío!</p>
        <div class="opacity-0">
            <IconChevronLeft class="mr-8" stroke-width="2" />
        </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-left',
    mode: 'out-in',
  }
})
</script>

<style>
</style>
