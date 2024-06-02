<template>
    <div>
       <DeliversZone v-if="isRepartidor" />
       <PartnersZone v-if="isSocio" />
    </div>
</template>
<script>
import { isRepartidor, isSocio } from '~/funciones/authorization.js';

export default {
    data() {
        return {
            userId: null,
            activeTab: 'active',
            pedidos: [],
            envios: [],
        };
    },
    computed: {
        isRepartidor() {
            return isRepartidor();
        },
        isSocio() {
            return isSocio();
        }
    }
}
</script>
