<template>
    <div class="mb-4 w-full">
      <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-1"
        :for="id"
      >
        {{ label }}
      </label>
  
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
    </div>
  </template>
  
  <script setup lang="ts">

  const props = defineProps({
    
    modelValue: {
      type: [String, Number],
      default: ''
    },
  
    type: {
      type: String,
      default: 'text'
    },
 
    placeholder: {
      type: String,
      default: ''
    },
 
    label: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
  })
  

  const emit = defineEmits<{
 
    (e: 'update:modelValue', v: string | number): void
  }>()
  
  function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
  </script>
  
  <style scoped>

  </style>