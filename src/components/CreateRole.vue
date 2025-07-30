<template>
  <form @submit.prevent="handleCreateRole" class="space-y-4">
    <Input
      v-model="newRole.name"
      label="Tên Role"
      placeholder="Nhập tên role"
    />

    <div class="flex items-center space-x-2">
      <input
        type="checkbox"
        id="isActive"
        v-model="newRole.isActive"
        class="h-4 w-4"
      />
      <label for="isActive" class="text-sm font-medium text-gray-700">
        Active
      </label>
    </div>

    <Input
      v-model="newRole.description"
      label="Mô tả"
      placeholder="Nhập mô tả"
    />

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Quyền (Permissions)
      </label>
      <select
        multiple
        v-model="newRole.permissions"
        class="w-full border-gray-300 rounded p-2"
      >
        <option
          v-for="perm in permissions"
          :key="perm._id"
          :value="perm._id"
        >
          {{ perm?.name || ''}}
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      :disabled="loading"
    >
      {{ loading ? 'Đang tạo...' : 'Tạo Role' }}
    </button>
    <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Input from './Input.vue' // Đảm bảo đường dẫn này đúng với vị trí của Input.vue

import { useRoleStore } from '../store/role'
import { usePermissionStore } from '../store/permission'

const router = useRouter()

// Khởi tạo trạng thái cho role mới
const newRole = ref({
  name: '',
  isActive: true,
  description: '',
  permissions: [] as string[], // Mảng các ID quyền
})

// Stores
const roleStore = useRoleStore()
const permissionStore = usePermissionStore()

// Lấy trạng thái loading và error từ roleStore
const { loading, error } = roleStore

// Lấy danh sách quyền từ permissionStore
const { permissions, fetchPermissions } = permissionStore

// Fetch permissions khi component được mount
onMounted(() => {
  fetchPermissions()
})

/**
 * Xử lý việc tạo role mới.
 * Gọi action createRole từ roleStore và điều hướng sau khi thành công.
 */
async function handleCreateRole() {
  try {
    // Gọi action createRole với dữ liệu từ newRole.value
    await roleStore.createRole(newRole.value)
    // Điều hướng về trang danh sách roles sau khi tạo thành công
    router.push('/roles')
  } catch (err) {
    // Lỗi sẽ được xử lý và hiển thị qua biến `error` của store
    console.error('Tạo role thất bại:', err)
  }
}
</script>

<style scoped>
/* Có thể thêm các style tùy chỉnh tại đây nếu cần */
select[multiple] {
  min-height: 100px; /* Đảm bảo đủ không gian cho danh sách quyền */
}
</style>
