<template>
    <NuxtPage :key="$route.fullPath"/>
</template>
  
  <script>
  export default {
    // Componente raíz de la aplicación
  }
  </script>
  
<style>
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 2s ease;
}

.slide-left-enter, .slide-left-leave-to {
  transform: translateX(100%);
}

.slide-left-leave-active {
  position: absolute;
}
  html {
  max-width: 100vw;
  overflow-x: hidden;
  padding-bottom: 40px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  .primary_color {
  color: #9139BA;
  }
  p {
    font-family: Poppins;
  }
  </style>
  