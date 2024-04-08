<template>
  <label :for="id" class="radio-button" :class="classes">
    <input
      :id="id"
      type="radio"
      :name="$props.name"
      v-model="$model"
      :value
      class="radio-button__exact"
    />
    <div class="radio-button__container" @click="onSelect">
      <button class="radio-button__fake">
        <div class="radio-button__checked-dot" />
      </button>
      <span class="radio-button__label">{{ $props.label }}</span>
    </div>
  </label>
</template>

<script setup>
import { nanoid } from 'nanoid';
import { computed, ref } from 'vue';

const $model = defineModel({ required: true });

const $props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: () => '',
  },
});

const classes = computed(() => {
  let array = [];
  if ($props.value === $model.value) {
    array.push('radio-button--checked');
  }
  return array;
});

const onSelect = () => {
  $model.value = $props.value;
};

const id = ref(nanoid());
</script>

<style scoped lang="scss">
.radio-button {
  &--checked {
    .radio-button__checked-dot {
      display: inline-block;
    }
  }
}

.radio-button__exact {
  display: none;
}

.radio-button__fake {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 0 0 2px rgba(#000, 0.25);
  border: none;
  position: relative;
  margin-right: 6px;
}

.radio-button__checked-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  box-shadow: 0 0 4px $accent-shadow-color;
  background: $accent-color;
  border-radius: 50%;
  display: none;
}

.radio-button__container {
  display: flex;
  align-items: center;
}
</style>
