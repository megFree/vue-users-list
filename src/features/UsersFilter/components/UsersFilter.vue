<template>
  <div class="users-filter">
    <InputShared v-model="filterOptions.searchAllCriteria" placeholder="Name, university, etc..." />
    <div class="users-filter__gender-selector">
      <RadioButtonShared
        name="radio-gender"
        value="all"
        label="All"
        v-model="filterOptions.searchGender"
      />
      <RadioButtonShared
        name="radio-gender"
        value="male"
        label="Male"
        v-model="filterOptions.searchGender"
      />
      <RadioButtonShared
        name="radio-gender"
        value="female"
        label="Female"
        v-model="filterOptions.searchGender"
      />
    </div>
    <div class="users-filter__age-range">
      <div class="users-filter__age-label">Age</div>
      <RangeShared
        v-model:minValue="filterOptions.searchAgeFrom"
        v-model:maxValue="filterOptions.searchAgeTo"
      />
    </div>
    <ButtonShared class="users-filter__reset-button" @click="$emit('reset')">Reset</ButtonShared>
  </div>
</template>

<script setup>
import { InputShared, RadioButtonShared, RangeShared, ButtonShared } from '@/shared';

const filterOptions = defineModel();

const $emit = defineEmits(['reset']);
</script>

<style scoped lang="scss">
.users-filter {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.users-filter__gender-selector {
  display: flex;
  gap: 12px;
}

.users-filter__age-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.users-filter__reset-button {
  width: fit-content;
}
</style>
