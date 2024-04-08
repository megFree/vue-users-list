<template>
  <div class="users-list-filter">
    <div class="users-list-filter__filter-container users-list-filter__filter-container--desktop">
      <UsersFilter
        class="users-list-filter__filter"
        v-model="filterOptions"
        @reset="resetFilters"
      />
    </div>
    <div class="users-list-filter__list">
      <UsersList
        class="users-list-filter__list-exact"
        :users="users.slice(0, limit)"
        @scrolled="increaseLimit"
      />
      <LoaderShared v-if="loading" class="users-list-filter__loader" />
    </div>
    <ButtonShared class="users-list-filter__popover-button" @click="showPopover"
      >Filters</ButtonShared
    >
    <transition
      @beforeEnter="popoverAnimBeforeEnter"
      @enter="popoverAnimEnter"
      @leave="popoverAnimLeave"
      :css="false"
    >
      <PopoverShared
        v-if="isPopoverOpen"
        title="Filters"
        class="users-list-filter__popover"
        @closed="hidePopover"
      >
        <UsersFilter
          class="users-list-filter__filter-container users-list-filter__filter-container--mobile"
          v-model="filterOptions"
          @reset="resetFilters"
        />
      </PopoverShared>
    </transition>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive, watch } from 'vue';
import { throttle } from 'lodash';
import UsersFilter from './UsersFilter.vue';
import UsersList from './UsersList.vue';
import { LoaderShared, disableScroll } from '@/shared';
import { useRouter, useRoute } from 'vue-router';
import { filterUsers } from '../lib/filterUsers';
import { defaultFilterSettings } from '../lib/const';
import { PopoverShared, ButtonShared } from '@/shared';
import gsap from 'gsap';
import { enableScroll } from '@/shared';
import { userApiGetAll } from '@/entities/UserEntity';
import { scrollToTop } from '@/shared/lib/scroll';

const $router = useRouter();
const $route = useRoute();

let allUsers = [];
const users = ref([]);
onBeforeMount(async () => {
  const loadedUsers = await userApiGetAll();
  allUsers = loadedUsers;
  users.value = filterUsers(loadedUsers, $route.query);
});

const defaultLimit = 10;
const limit = ref(defaultLimit);
const loading = ref(false);
const delayMs = 500;
const increaseLimit = throttle(
  () => {
    if (limit.value >= users.value.length) {
      return;
    }

    const increaseLimitOn = 5;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      limit.value += increaseLimitOn;
      increaseLimit.cancel();
    }, delayMs);
  },
  delayMs,
  { leading: true, trailing: false },
);

const filterOptions = reactive({ ...defaultFilterSettings, ...$route.query });
const throttledScroll = throttle(scrollToTop, delayMs, { leading: true, trailing: false });
watch(filterOptions, (incoming) => {
  $router.replace({
    ...$route,
    query: {
      ...$route.query,
      ...incoming,
    },
  });
  throttledScroll();
  limit.value = defaultLimit;
  users.value = filterUsers(allUsers, incoming);
});
const resetFilters = () => {
  Object.assign(filterOptions, { ...defaultFilterSettings });
};

const isPopoverOpen = ref(false);
const showPopover = () => {
  isPopoverOpen.value = true;
};
const hidePopover = () => {
  isPopoverOpen.value = false;
};

const popoverAnimBeforeEnter = (el) => {
  disableScroll();
  const popover = el.querySelector('.popover__exact');
  gsap.set(popover, {
    yPercent: 100,
  });
};
const popoverAnimEnter = (el) => {
  const popover = el.querySelector('.popover__exact');
  gsap.to(popover, {
    duration: 0.3,
    yPercent: 0,
  });
};
const popoverAnimLeave = (el, done) => {
  const popover = el.querySelector('.popover__exact');
  gsap.to(popover, {
    duration: 0.3,
    yPercent: 100,
    onComplete: () => {
      done();
      enableScroll();
    },
  });
};
</script>

<style scoped lang="scss">
.users-list-filter {
  display: flex;
  flex-direction: column;

  @media #{$tablet} {
    flex-direction: row;
  }
}

.users-list-filter__filter-container {
  margin-right: 12px;
  position: relative;

  &--desktop {
    display: none;
  }

  @media #{$tablet} {
    flex-basis: 200px;

    &--desktop {
      display: block;
    }
  }

  @media #{$laptop} {
    flex-basis: 300px;
  }
}

.users-list-filter__filter {
  position: sticky;
  top: 12px;

  @media #{$laptop} {
    top: 24px;
  }
}

.users-list-filter__list {
  position: relative;
  padding-bottom: 46px;

  @media #{$tablet} {
    flex-grow: 1;
  }
}

.users-list-filter__loader {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
}

.users-list-filter__overlay {
  @media #{$tablet} {
    display: none;
  }
}

.users-list-filter__popover-button {
  position: fixed;
  bottom: 0;
  right: 32px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @media #{$tablet} {
    display: none;
  }
}
</style>
