<template>
  <OverlayShared class="popover">
    <div class="popover__exact">
      <div v-if="$props.title" class="popover__title">{{ $props.title }}</div>
      <IconShared iconName="close" class="popover__close" @click="$emit('closed')" />
      <div class="popover__content"><slot /></div>
    </div>
  </OverlayShared>
</template>

<script setup>
import { IconShared, OverlayShared } from '@/shared';

const $props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

const $emit = defineEmits('closed');
</script>

<style scoped lang="scss">
.popover {
  @media #{$tablet} {
    display: none;
  }
}

.popover__exact {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: $white;
  padding: 16px;
  border-radius: 16px 16px 0 0;
}

.popover__title {
  font-size: 1.33rem;
  color: $accent-color;
  margin-bottom: 12px;
}

.popover__close {
  position: absolute;
  right: 16px;
  top: 16px;
}
</style>
