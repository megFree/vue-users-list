<template>
  <div class="user">
    <div class="user__avatar">
      <img :src="$props.user.image" alt="avatar" class="user__avatar-img" />
    </div>
    <div class="user__gender">
      <IconShared class="user__gender-icon" :iconName="$props.user.gender" />
    </div>
    <div class="user__info">
      <h2 class="user__name">{{ fullName }}, {{ $props.user.age }}</h2>
      <div class="user-info__list">
        <div
          v-for="(infoItem, index) in infoList"
          :key="`${index}-${infoItem.type}`"
          class="user-info__list-item"
        >
          <IconShared class="user-info__item-icon" :iconName="infoItem.icon" />
          <div class="user-info__item-text">{{ infoItem.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { IconShared } from '@/shared';

const $props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const infoList = computed(() => {
  return [
    userLocation.value && {
      type: 'location',
      value: userLocation.value,
      icon: 'town',
    },
    $props.user.domain && {
      type: 'website',
      value: $props.user.domain,
      icon: 'web',
    },
    $props.user.university && {
      type: 'university',
      value: $props.user.university,
      icon: 'university',
    },
    $props.user.phone && {
      type: 'phone',
      value: $props.user.phone,
      icon: 'phone',
    },
  ].filter((item) => !!item);
});

const userLocation = computed(() => {
  if (!($props.user.address.city || $props.user.address.state)) {
    return null;
  }

  let location = `${$props.user.address.city ?? ''}, ${$props.user.address.state ?? ''}`;
  if (location.indexOf(', ') === 0) {
    location = location.replace(', ', '');
  }
  return location;
});

const fullName = computed(() => {
  return `${$props.user.firstName} ${$props.user.lastName}`;
});
</script>

<style scoped lang="scss">
.user {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  padding-left: 106px;
  box-shadow: 0 0 12px 0 $accent-shadow-color;
  min-height: 130px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 53px;
    background: #{$accent-color};
    top: 0;
    left: 0;
    z-index: -1;
  }

  @media #{$tablet} {
    padding: 24px;
    padding-left: 166px;
    min-height: 170px;

    &::after {
      width: 84px;
    }
  }
}

.user__avatar {
  width: 73px;
  height: 73px;
  position: absolute;
  top: 16px;
  left: 16px;
  border-radius: 50%;
  border: 2px solid #{$accent-color};
  overflow: hidden;
  background: #ffffff;

  @media #{$tablet} {
    width: 117px;
    height: 117px;
    top: 24px;
    left: 24px;
    border-width: 3px;
  }
}

.user__avatar-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.user__gender {
  position: absolute;
  top: 88px;
  left: 38px;
  width: 28px;
  height: 28px;
  background: #{$accent-color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  @media #{$tablet} {
    background: transparent;
    top: 24px;
    right: 24px;
    bottom: unset;
    left: unset;
  }
}

.user-info__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-info__list-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.user__name {
  font-size: 2rem;
  margin-bottom: 10px;

  @media #{$tablet} {
    margin-bottom: 12px;
  }
}

.user-info__item-icon {
  flex-shrink: 0;
}
</style>
