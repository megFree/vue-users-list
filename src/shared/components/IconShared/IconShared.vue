<template>
  <div class="icon">
    <component :is="icon" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const $props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(() => import(`./icons/${$props.iconName}.svg?component`));
</script>

<style lang="scss">
.icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    height: 100%;
    widows: 100%;
  }

  @media #{$laptop} {
    width: 20px;
    height: 20px;
  }
}
</style>
