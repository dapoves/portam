<template>
    <div>
      <div id="circulo"></div>
      <slot />
    </div>
  </template>
  
  <script>
  export default {
  };
  </script>
  
  <style scoped>
  @keyframes mover {
  0% {
    transform: translateY(50vh);
  }
  100% {
    transform: translateY(-70vh);
  }
}
  #circulo {
    width: 120%;
    height: 80vh;
    background-color: #EBD5F9;
    border-radius: 50%;
    animation: mover 0s ease-in-out forwards; 
    position: absolute;
    bottom: 0;
    left: -10%;
    z-index: -1;
  }
  #fondo {
    width: 100%;
    
    background-color: #EBD5F9;
    animation: mover 2s ease-in-out forwards;
    position: absolute;
    bottom: 50%;
    z-index: -1;
  }
  </style>
