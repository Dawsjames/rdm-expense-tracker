<script setup lang="ts">
import { ref } from 'vue'
import MobileNavbar from 'src/components/common/MobileNavbar.vue'

const addTransactionModalOpen = ref(false)

const openAddTransactionModal = () => {
    addTransactionModalOpen.value = true
}
</script>
<template lang="pug">
q-layout(view="lHh Lpr lFf")
    q-page-container
        router-view
    MobileNavbar
    
    q-dialog(v-model="openAddTransactionModal" persistent)
    q-card
        q-card-section.row.items-center
        .text-h6 Add Transaction
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
        p Transaction form will go here
    </template>
