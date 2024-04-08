<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.layout {
  padding: 12px 8px 0;
  margin: 0 auto;
  max-width: 1024px;

  @media #{$laptop} {
    padding: 24px 0 0;
  }
}
</style>
