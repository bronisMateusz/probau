<script setup>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <page-header />
  <main>
    <router-view />
  </main>
  <page-footer />
</template>

<style lang="scss">
@use '@//assets/scss/styles.scss' as *;
</style>
