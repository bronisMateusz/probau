<script setup>
import PageNavbar from '@/components/PageNavbar.vue'
</script>

<template>
  <header id="page-header">
    <page-navbar />
  </header>
</template>

<style lang="scss">
#page-header {
  background-color: $color-tertiary;
  color: $color-text-inverted;
  inset: 0 0 auto;
  padding: 10px 10px 10px 20px;
  position: fixed;

  @media (min-width: $lg) {
    padding: 0 15px;
  }

  @media (min-width: $xxl) {
    padding-right: 240px;
  }
}
</style>
