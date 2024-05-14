<template>
    <div>
        <GeneralHeader>Pedido</GeneralHeader>
        {{  props.order }}
    </div>
</template>
<script setup>
const props = defineProps({
  order: Object
})

onMounted(() => {
  console.log(props.order)
})  

</script>