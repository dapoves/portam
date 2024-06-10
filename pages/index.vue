<template>
  <div>
    <IndexHeader></IndexHeader>
    <CategoryList></CategoryList>
    <EstablishmentCard v-for="stablish in filteredStablishments" :key="stablish.id" :stablish="stablish"></EstablishmentCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import EstablecimientoService from '@/services/EstablecimientoService';
import { useEstablecimientoStore } from '~/stores/establecimientos';

let stablishments = ref([]);
const establecimientoStore = useEstablecimientoStore();

function getEstablishments() {
  EstablecimientoService.getEstablecimientos().then((response) => {
    stablishments.value = response.data;
  });
}

const filteredStablishments = computed(() => {
  if (establecimientoStore.selectedCategory == '') {
    return stablishments.value;
  }
  return stablishments.value.filter(
    (stablish) => stablish.categoria_id === establecimientoStore.selectedCategory.id
  );
});


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