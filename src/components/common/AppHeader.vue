<template lang="pug">
    .app-header.q-px-md.q-py-sm
        .row.items-center.justify-between
            .header-title.text-h6 {{ title }}
            .header-date.text-caption {{ currentDate }}
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentDate = computed(() => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
    })
})
</script>

<style lang="scss" scoped>
.app-header {
    background-color: white
}
</style>