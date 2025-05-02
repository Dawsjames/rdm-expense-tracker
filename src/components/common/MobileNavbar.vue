<template lang="pug">
.mobile-navbar.fixed-bottom.bg-white
    .row.q-px-md.q-py-sm
        .col.text-center(@click="navigateTo('/')" :class="{ 'text-primary': isActive('/') }")
            q-icon(name="home" size="sm")
            .text-caption Home
        .col.text-center(@click="navigateTo('/transactions')" :class="{ 'text-primary': isActive('/transactions') }")
            q-icon(name="receipt_long" size="sm")
            .text-caption Transactions
        .col.text-center
            q-btn.q-mt-n4(round color="primary" icon="add" @click="$emit('add-transaction')")
        .col.text-center(@click="navigateTo('/budget')" :class="{ 'text-primary': isActive('/budget') }")
            q-icon(name="schedule" size="sm")
            .text-caption Budget
        .col.text-center(@click="navigateTo('/settings')" :class="{ 'text-primary': isActive('/settings') }")
            q-icon(name="settings" size="sm")
            .text-caption Settings
    </template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

// Define emits
const emit = defineEmits(['add-transaction'])

// Get router and current route
const router = useRouter()
const route = useRoute()

// Method to navigate to a specific path
const navigateTo = (path: string) => {
    router.push(path)
}

// Check if the current route matches the given path
const isActive = (path: string) => {
    return route.path === path
}
</script>

<style lang="scss" scoped>
.mobile-navbar {
    border-top: 1px solid $grey-3;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
}
</style>