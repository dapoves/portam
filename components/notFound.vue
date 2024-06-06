<template>
  <div v-if="showComponent">
    <img src="https://damian.jdfs.dev/storage/emojis/crying.png" alt="crying" class="mx-auto pt-6" />
    <p class="text-2xl md:text-xl text-center mt-3 px-6"><slot></slot></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showComponent: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showComponent = true;
    }, 800); // 1 segundo de retraso
  },
};
</script>