<template>
  <div class="icon" v-html="icon" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
const $props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

const iconsUrl = './icons';
const icon = ref(null);
onBeforeMount(async () => {
  icon.value = (await import(`${iconsUrl}/${$props.iconName}.svg?raw`)).default;
});
</script>

<style scoped lang="scss">
.icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
    width: 100%;
  }

  @media #{$laptop} {
    width: 20px;
    height: 20px;
  }
}
</style>
