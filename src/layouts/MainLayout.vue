<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-page-container
      router-view
    
    
    q-dialog(v-model="addTransactionDialog")
      q-card
        q-card-section
          .text-h6 Add Transaction
        q-card-section
          p Transaction form will go here
        q-card-actions(align="right")
          q-btn(flat, label="Cancel", color="primary", v-close-popup)
          q-btn(flat, label="Save", color="primary", v-close-popup)
  </template>

<script setup lang="ts">

</script>

<style lang="scss">
body {
  background-color: #f5f5f5;
}
</style>