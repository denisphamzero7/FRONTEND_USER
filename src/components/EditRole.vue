<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold mb-6">Chỉnh sửa Role</h2>
    <form @submit.prevent="handleUpdateRole" class="space-y-4">
      <!-- Tên Role -->
      <Input
        v-model="newRole.name"
        label="Tên Role"
        placeholder="Nhập tên role"
      />

      <!-- Active -->
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

      <!-- Mô tả -->
      <Input
        v-model="newRole.description"
        label="Mô tả"
        placeholder="Nhập mô tả"
      />

      <!-- Permissions -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Quyền (Permissions)
        </label>
        <div v-if="loadingPerms" class="text-sm text-gray-500">Đang tải quyền…</div>
        <div v-else-if="errorPerms" class="text-sm text-red-500">{{ errorPerms }}</div>
        <select
          v-else
          multiple
          v-model="newRole.permissions"
          class="w-full border-gray-300 rounded p-2"
          size="8"
        >
          <option
            v-for="perm in permissions"
            :key="perm._id"
            :value="perm._id"
          >
            {{ perm.name }}
          </option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end space-x-2 mt-6">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 border rounded"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          :disabled="loadingRole || loadingPerms"
        >
          {{ loadingRole ? 'Đang cập nhật...' : 'Cập nhật Role' }}
        </button>
      </div>

      <div v-if="errorRole" class="text-red-500 text-sm mt-2">{{ errorRole }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Input from './Input.vue'
import { useRoleStore } from '../store/role'
import { usePermissionStore } from '../store/permission'

const router = useRouter()
const route = useRoute()

// Role store
const roleStore = useRoleStore()
const {
  newRole,
  loading: loadingRole,
  error: errorRole,
  fetchRoleId,
  updateaRole
} = roleStore

// Permission store
const permStore = usePermissionStore()
const {
  permissions,
  fetchPermissions,
  loadingPerms,
  errorPerms
} = permStore
  const id = route.params.id as string

onMounted(async () => {
  await fetchRoleId(id);
  await fetchPermissions();
});

// Hàm cập nhật
async function handleUpdateRole() {
  const id = route.params.id as string
  const payload = {
    name: newRole.name,
    isActive: newRole.isActive,
    description: newRole.description,
    permissions: newRole.permissions
  }
  const success = await updateaRole(id, payload)
  if (success) {
    router.push('/roles')
  }
}

function goBack() {
  router.back()
}
</script>

<style scoped>
select[multiple] {
  min-height: 120px;
}
</style>