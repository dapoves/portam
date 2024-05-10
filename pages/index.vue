<template>
  <div>
    <IndexHeader></IndexHeader>
    <CategoryList></CategoryList>
    <EstablishmentCard v-for="stablish in stablishments" :key="stablish.id" :stablish="stablish"></EstablishmentCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import EstablecimientoService from '@/services/EstablecimientoService';

let stablishments = ref([]);

function getEstablishments() {
  EstablecimientoService.getEstablecimientos().then((response) => {
    stablishments.value = response.data;
  });
}

onMounted(getEstablishments);
</script>

<style scoped>
form {
  padding: 20px;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 450px;
}
</style>