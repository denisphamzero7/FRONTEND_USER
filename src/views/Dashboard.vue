<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      <ul class="space-y-2">
        <li>
          <router-link :to="{ name: 'UserList' }" class="text-blue-600 hover:underline">
            ➤ User Management
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Roles' }" class="text-blue-600 hover:underline">
            ➤ Role Management
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Permissions' }" class="text-blue-600 hover:underline">
            ➤ Permission Management
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  // Không cần logic đặc biệt ở đây
  </script>
  
  <style scoped>
  /* Tuỳ chỉnh nếu cần */
  </style>
  