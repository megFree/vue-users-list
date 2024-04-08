<template>
  <div class="loader" v-html="loaderImg" />
</template>

<script setup>
import loaderImg from './loader.svg?raw';
</script>

<style scoped lang="scss">
.loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  color: $accent-color;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
