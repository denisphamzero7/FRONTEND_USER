<template>
  <button
    :class="[
      'text-sm font-medium border rounded-full px-3 py-1 transition',
      Variants[variant] ?? Variants.default
    ]"
    @click="$emit('click')"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);

const Variants = {
  default: 'border-gray-200 text-gray-700 hover:bg-gray-100',
  primary: 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600',
  success: 'bg-green-500 border-green-500 text-white hover:bg-green-600',
  warning: 'bg-yellow-400 border-yellow-400 text-gray-800 hover:bg-yellow-500',
  danger: 'bg-red-200 border-red-200 text-red-900 hover:bg-red-100',
  info: 'bg-indigo-200 border-indigo-200 text-indigo-900 hover:bg-indigo-300',
};

defineProps({
  variant: {
    type: String,
    default: 'default',
  },
});
</script>
