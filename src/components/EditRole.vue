<template>
    <form @submit.prevent="handleUpdateRole" class="space-y-4">
      <Input
        v-model="role.name"
        label="Tên Role"
        placeholder="Nhập tên role"
      />
  
      <div class="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          v-model="role.isActive"
          class="h-4 w-4"
        />
        <label for="isActive" class="text-sm font-medium text-gray-700">
          Active
        </label>
      </div>
  
      <Input
        v-model="role.description"
        label="Mô tả"
        placeholder="Nhập mô tả"
      />
  
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Quyền (Permissions)
        </label>
        <select
          multiple
          v-model="roles.permissions"
          class="w-full border-gray-300 rounded p-2"
        >
          <option
            v-for="perm in Permissions"
            :key="perm._id"
            :value="perm._id"
          >
            {{ perm.name }}
          </option>
        </select>
      </div>
  
      <button
        type="submit"
        class="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        :disabled="loading"
      >
        {{ loading ? 'Đang lưu...' : 'Lưu thay đổi' }}
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { onMounted, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import Input from './Input.vue'
  
  import { useRoleStore } from '../store/role'
  import { usePermissionStore } from '../store/permission'
  
  const router = useRouter()
  const route = useRoute()
  
  const roleStore = useRoleStore()
  const permissionStore = usePermissionStore()
  
  const { fetchRoleId, updateaRole, loading, error, roles } = roleStore
  const { fetchPermissions, Permissions } = permissionStore
  
  onMounted(async () => {
    const id = route.params.id as string
    await fetchPermissions()
    await fetchRoleId(id)
  })
  
  async function handleUpdateRole() {
    try {
      const id = roles._id!
      const payload = {
        name: roles.name,
        isActive: roles.isActive,
        description: roles.description,
        permissions: roles.permissions,
      }
      const success = await updateRole(id, payload)
      if (success) {
        router.push({ name: 'RoleList' })
      } else {
        console.error('Cập nhật thất bại:', error.value)
      }
    } catch (e) {
      console.error('Lỗi khi cập nhật:', e)
    }
  }
  </script>
  