<template>
  <div class="range">
    <InputShared type="number" v-model="min" placeholder="From" :isError="minInputError" />
    &mdash;
    <InputShared type="number" v-model="max" placeholder="To" :isError="maxInputError" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { InputShared } from '@/shared';

const min = defineModel('minValue');
const max = defineModel('maxValue');

const $props = defineProps({
  boundaries: {
    type: Object,
    default: () => ({
      min: 0,
      max: 100,
    }),
  },
});

const minInputError = computed(() => {
  return (
    +min.value < $props.boundaries.min ||
    +min.value > $props.boundaries.max ||
    +min.value > +max.value
  );
});

const maxInputError = computed(() => {
  return (
    +max.value > $props.boundaries.max ||
    +max.value < $props.boundaries.min ||
    +max.value < +min.value
  );
});
</script>

<style scoped lang="scss">
.range {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
