<template>
  <div class="overflow-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 gap-4">
      <h2 class="text-lg font-semibold">Danh sách quyền</h2>
      <Input
        class="w-[300px]"
        v-model="keyWord"
        label="Tìm kiếm quyền"
        placeholder="Nhập tên quyền"
      />
      <RoundButton variant="primary" @click="handleCreatePermission">
        + Tạo quyền
      </RoundButton>
    </div>

    <!-- Table -->
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-3 py-3 text-left">Tên</th>
          <th class="px-3 py-3 text-left">Module</th>
          <th class="px-3 py-3 text-left">Method</th>
          <th class="px-3 py-3 text-left">API Path</th>
          <th class="px-3 py-3 text-left">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loading -->
        <tr v-if="loadingPerms">
          <td colspan="5" class="text-center py-4">Đang tải dữ liệu...</td>
        </tr>
        <!-- Data -->
        <tr
          v-for="perm in permissions"
          :key="perm._id"
          class="hover:bg-gray-100"
        >
          <td class="px-3 py-3">{{ perm.name }}</td>
          <td class="px-3 py-3">{{ perm.module }}</td>
          <td class="px-3 py-3">{{ perm.method }}</td>
          <td class="px-3 py-3">{{ perm.apiPath }}</td>
          <td class="px-3 py-3 flex gap-2">
            <RoundButton variant="primary" @click="editPermission(perm._id)">Sửa</RoundButton>
            <RoundButton variant="danger" @click="removePermissionConfirm(perm._id)">Xoá</RoundButton>
            <RoundButton variant="default" @click="detailPermission(perm._id)">Xem</RoundButton>
          </td>
        </tr>
        <!-- Empty -->
        <tr v-if="!loadingPerms && permissions.length === 0">
          <td colspan="5" class="text-center py-4 text-gray-500">Không tìm thấy quyền nào.</td>
        </tr>
        <!-- Error -->
        <tr v-if="errorPerms">
          <td colspan="5" class="text-center py-4 text-red-500">{{ errorPerms }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePermissionStore } from '../store/permission';
import { storeToRefs } from 'pinia';
import Input from './Input.vue';
import RoundButton from "../components/RoundButton.vue";

const router = useRouter();
const store = usePermissionStore();
const { permissions, loadingPerms, errorPerms ,keyWord} = storeToRefs(store);
// const { keyWord } = store;
onMounted(() => {
  store.fetchPermissions();
});

watch(
  keyWord,
  (value) => {
    const q = value.trim();
    if (q) {
      store.searchPermissionByQuery({ name: q });
    } else {
      store.fetchPermissions();
    }
  },
  {
    immediate: true,  
   
  }
);

function handleCreatePermission() {
  router.push('/permissions/create');
}
function editPermission(permissionId: string) {
  router.push(`/permissions/edit/${permissionId}`);
}
async function removePermissionConfirm(permissionId: string) {
  if (confirm('Bạn có chắc chắn muốn xoá quyền này?')) {
    await store.removePermission(permissionId);
  }
}
function detailPermission(permissionId:string){
  router.push(`/permissions/${permissionId}`);
}
</script>
