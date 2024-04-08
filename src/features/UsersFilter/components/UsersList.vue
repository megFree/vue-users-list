<template>
  <div class="users-list">
    <div class="users-list__items">
      <UserEntity
        v-for="(user, index) in $props.users"
        :key="`${index}-${user.id}`"
        :user="user"
        class="users-list__item"
      />
    </div>
  </div>
</template>

<script setup>
import { UserEntity } from '@/entities/UserEntity';
import { onMounted, onUnmounted } from 'vue';

const $props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const $emit = defineEmits(['scrolled']);

const scrollHandler = () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    $emit('scrolled');
  }
};
onMounted(() => {
  window.addEventListener('scroll', scrollHandler);
});
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
});
</script>

<style scoped lang="scss">
.users-list__item {
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  @media #{$tablet} {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>
