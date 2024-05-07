<template>
  <div>
    <h1>Hola que tal</h1>
    <button @click="logout">Salir</button>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";

definePageMeta({
  middleware: 'auth'
})

export default {
  methods: {
    logout() {
      console.log('logout');
      LoginService.logout().then(() => {
        if (response.data.status == 'ok') {
          console.log(response.data.message);
          this.$swal('Sesión cerrada', 'Hasta luego', 'success');
        } else {
          this.$swal('Error', response.data.message, 'error');
        }
      });
    }
  }

}
</script>

<style scoped>
form {
  padding: 20px;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 450px;

}
</style>