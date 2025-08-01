<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Thông tin quyền
      </h1>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700" v-if="permission">
        <div class="flex flex-col">
          <span class="font-medium">Tên quyền:</span>
          <span>{{ permission.name }}</span>
        </div>
  
        <div class="flex flex-col">
          <span class="font-medium">Phương thức:</span>
          <span>{{ permission.method }}</span>
        </div>
  
        <div class="flex flex-col">
          <span class="font-medium">Module:</span>
          <span>{{ permission.module }}</span>
        </div>
  
        <div class="flex flex-col">
          <span class="font-medium">API Path:</span>
          <span>{{ permission.apiPath }}</span>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">Đang tải dữ liệu...</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { usePermissionStore } from '../store/permission'
  import type { Permission } from '../types/permission'
  
  const route = useRoute()
  const { fetchPermissionId } = usePermissionStore()
  
  const permission = ref<Permission | null>(null)
  const id = route.params.permissionId as string
  
  onMounted(async () => {
    const data = await fetchPermissionId(id)
    if (data) {
      permission.value = data
    }
  })
  </script>
  
  <style scoped>
  /* Thêm style nếu cần */
  </style>
  