<template>
  <button class="button" :class="classes" @click="$emit('click')"><slot /></button>
</template>

<script setup>
import { ref } from 'vue';
const $props = defineProps({
  size: {
    type: String,
    default: 'medium', // large, medium, small
  },
});

const $emit = defineEmits(['click']);

const classes = ref({
  'button--small': $props.size === 'small',
  'button--medium': $props.size === 'medium',
  'button--large': $props.size === 'large',
});
</script>

<style scoped lang="scss">
.button {
  background: $accent-color;
  color: $white;
  display: flex;
  align-items: center;
  outline: none;
  border: none;

  &--small {
    height: 24px;
    padding: 0 12px;
    border-radius: 4px;
  }

  &--medium {
    height: 32px;
    padding: 18px;
    border-radius: 6px;
  }

  &--large {
    height: 42px;
    padding: 24px;
    border-radius: 8px;
  }
}
</style>
