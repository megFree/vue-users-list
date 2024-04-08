<template>
  <div class="input" :class="classes">
    <span v-if="$props.placeholder" class="input__placeholder">{{ $props.placeholder }}</span>
    <input
      :type="$props.type"
      class="input__exact"
      v-model="$model"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const $model = defineModel();

const $props = defineProps({
  placeholder: {
    type: String,
    default: () => '',
  },
  type: {
    type: String,
    default: 'text', // text, number
  },
  isError: {
    type: Boolean,
    default: false,
  },
});

const classes = computed(() => ({
  'input--focused': isFocus.value,
  'input--filled': $model.value === 0 || $model.value,
  'input--margin-top': !!$props.placeholder,
  'input--border-red': $props.isError,
}));

const isFocus = ref(false);
const onFocus = () => {
  isFocus.value = true;
};
const onBlur = () => {
  isFocus.value = false;
};
</script>

<style scoped lang="scss">
.input {
  height: 36px;
  border-bottom: 1px solid $gray;
  display: inline-flex;
  align-items: center;
  padding: 0 4px;
  position: relative;
  background: $gray-background;
  font-size: 1rem;

  &--focused {
    background: $accent-background;
  }

  &--focused,
  &--filled {
    border-bottom: 1px solid $accent-color;

    .input__placeholder {
      font-size: 0.7rem;
      top: 8px;
      left: 4px;
      color: $accent-color;
    }
  }

  &--margin-top {
    .input__exact {
      margin-top: 8px;
    }
  }

  &--border-red {
    border-bottom: 1px solid $error;

    .input__placeholder {
      color: $error;
    }

    .input__exact {
      color: $error;
    }
  }

  @media #{$laptop} {
    height: 42px;
  }
}

.input__placeholder {
  position: absolute;
  pointer-events: none;
  font-size: 1rem;
  transition: all 0.1s ease-in-out;
  top: 50%;
  transform: translateY(-50%);
}

.input__exact {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
}
</style>
