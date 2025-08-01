<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
    <!-- Nếu đã load xong roleDetail thì hiển thị, không thì show loading -->
    <div v-if="roleDetail">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Thông tin Role
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div class="flex flex-col">
          <span class="font-medium">Tên Role:</span>
          <span>{{ roleDetail.name }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-medium">Mô tả:</span>
          <span>{{ roleDetail.description || '—' }}</span>
        </div>

        <div class="flex flex-col">
          <span class="font-medium">Trạng thái:</span>
          <span>
            <span
              class="inline-block px-2 py-1 text-xs rounded-full"
              :class="roleDetail.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            >
              {{ roleDetail.isActive ? 'Kích hoạt' : 'Tạm khóa' }}
            </span>
          </span>
        </div>

        <div class="flex flex-col sm:col-span-2">
          <span class="font-medium mb-1">Permissions:</span>

          <!-- Nếu có permissionIds -->
          <ul v-if="assignedPermissions.length" class="list-disc list-inside space-y-1">
            <li v-for="perm in assignedPermissions" :key="perm._id">
              {{ perm.name }}
            </li>
          </ul>

          <!-- Nếu là admin thì show hết -->
          <template v-else-if="roleDetail.name.toLowerCase() === 'admin'">
            <p v-for="perm in permissionStore.permissions" :key="perm._id">
              {{ perm.name }}
            </p>
          </template>

          <!-- Không có permission nào -->
          <span v-else class="text-gray-500">Chưa có permission nào</span>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center text-gray-500">
      Đang tải dữ liệu...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '../store/role'
import { usePermissionStore } from '../store/permission'
import type { Permission } from '../types/permission'
import type { Role } from '../types/role'

const route = useRoute()
const roleStore = useRoleStore()
const permissionStore = usePermissionStore()

// ref giữ chi tiết Role
const roleDetail = ref<Role & { permissions?: (string | Permission)[] } | null>(null)

// computed danh sách permission object gán cho role
const assignedPermissions = computed<Permission[]>(() => {
  if (!roleDetail.value) return []
  const raw = roleDetail.value.permissions ?? []
  // raw có thể là mảng ID hoặc object
  const ids = raw.map(p => typeof p === 'string' ? p : p._id)
  return permissionStore.permissions.filter(p => ids.includes(p._id))
})

onMounted(async () => {
  // 1) Load toàn bộ permissions để map tên
  await permissionStore.fetchPermissions()
  // 2) Load chi tiết role từ API
  const data = await roleStore.fetchRoleId(route.params.roleId as string)
  if (data) {
    // data.permissions có thể trả về mảng object hoặc mảng ID
    roleDetail.value = data
  }
})
</script>

<style scoped>
/* Thêm style nếu cần */
</style>
