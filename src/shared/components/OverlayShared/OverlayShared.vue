<template>
  <div class="overlay">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(#bfbfbf, 0.63);
}
</style>
