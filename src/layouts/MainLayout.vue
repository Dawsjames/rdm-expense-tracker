<template lang="pug">
  q-layout(view="hHh lpR fFf")
    AppHeader
    q-page-container
      router-view
    MobileNavbar
  </template>

<script setup lang="ts">
import AppHeader from 'src/components/common/AppHeader.vue';
import MobileNavbar from 'src/components/common/MobileNavbar.vue';
</script>
