<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-semibold mb-6">Chỉnh sửa vai trò</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input v-model="form.name" label="Tên vai trò" placeholder="Nhập tên vai trò" />
      <Input v-model="form.description" label="Mô tả" placeholder="Nhập mô tả" />

      <div class="flex items-center space-x-2">
        <input type="checkbox" id="isActive" v-model="form.isActive" class="h-4 w-4" />
        <label for="isActive">Kích hoạt</label>
      </div>
      <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Thêm quyền</label
      >
      <div v-if="loadingPerms">>>>></div>
      <div v-else-if="errorPerms">{{ errorPerms }}</div>
      <div
        v-else-if="permissions.length === 0"
        class="text-sm text-gray-500 mb-1"
      >
        chưa có quyền nào
      </div>

      <select
        v-else
        multiple
        v-model="form.permissions"
        class="w-full border-gray-300 rounded p-2 h-40"
      >
        <option v-for="perm in permissions" :key="perm._id" :value="perm._id">
          {{ perm.name }}
        </option>
      </select>
    </div>
      <div class="flex justify-end space-x-2">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? "Đang cập nhật..." : "Cập nhật" }}
        </button>
      </div>

      <p v-if="error" class="text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { useRoleStore } from '../store/role'
import Input from '../components/Input.vue'
import { usePermissionStore } from '../store/permission'

const route = useRoute()
const router = useRouter()
const { fetchRoleId, updateaRole, error, loading } = useRoleStore()
const { permissions, fetchPermissions, loadingPerms, errorPerms } = usePermissionStore();
const id  = route.params?.roleId as string; 
console.log(id);
const form = reactive({
  name: '',
  description: '',
  isActive: true,
  permissions: [] as string[],
})

const loadData = async () => {
  const data = await fetchRoleId(id)
  console.log('data',data);
  if (data) {
    Object.assign(form, {
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      permissions: Array.isArray(data.permissions)
      ? data.permissions.map((p: any) => p._id)
      : [],
    })
  }
}

const handleSubmit = async () => {
  const success = await updateaRole(id, { ...form })
  if (success) {
    router.push('/roles')
  }
}

onMounted(() => {
  loadData();
  fetchPermissions();
  
});
</script>
