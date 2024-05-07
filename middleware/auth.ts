import LoginService from "@/services/LoginService";

// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  LoginService.isAuthenticated().then((isAuthenticated) => {
    if (!isAuthenticated.data) {
      console.log("Not authenticated, redirecting to login page");
      navigateTo("/login");
    }
  });
})
