// plugins/sweetalert2.ts

import { defineNuxtPlugin } from '#app'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueSweetalert2)
})
