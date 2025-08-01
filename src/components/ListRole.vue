<template>
    <div class="overflow-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 gap-4">
        <h2 class="text-lg font-semibold">Danh sách vai trò</h2>
        <Input class="w-[300px]" v-model="keyWord" label="Tìm kiếm vai trò" placeholder="Nhập tên vai trò" />
        <RoundButton variant="primary" @click="handleCreateRole">+ Tạo vai trò</RoundButton>
      </div>
  
      <!-- Table -->
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-3 py-3">Tên</th>
            <th class="px-3 py-3">Kích hoạt</th>
            <th class="px-3 py-3">Mô tả</th>
            <th class="px-3 py-3">Quyền</th>
            <th class="px-3 py-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="5" class="text-center py-4">Đang tải dữ liệu...</td>
          </tr>
  
          <tr v-for="role in roles" :key="role._id">
            <td class="px-3 py-3 text-center">{{ role.name }}</td>
            <td class="px-3 py-3 text-center"><input type="checkbox" id="isActive" v-model=" role.isActive" class="h-4 w-4" /></td>
            <td class="px-3 py-3 text-center">{{ role.description }}</td>
            <td class="px-3 py-3 text-center">  {{role.permissions?.length }}</td>
            <td class="px-3 py-3 text-center space-x-2">
              <RoundButton variant="danger" @click="removeRole(role._id)">Xoá</RoundButton>
              <RoundButton variant="default" @click="editRole(role._id)">Chỉnh sửa</RoundButton>
              <RoundButton variant="default" @click="DetailRole(role._id)">Xem</RoundButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import { useRouter } from "vue-router"; 
  import { useRoleStore } from "../store/role"; 
  import RoundButton from "../components/RoundButton.vue";
  import Input from './Input.vue';
import { storeToRefs } from "pinia";
  const router = useRouter();
  const Theader = ref(["Name", "Email", "Age", "Gender", "Action"]);
  
  const roleStore = useRoleStore()
const { roles, keyWord, loading } = storeToRefs(roleStore)
const { fetchRole, removeRole } = roleStore
// role.permissions?.map(p => p.name).join(', ') || ' Không có quyền' 
//   watch(keyWord,(value)=>{
//     searchUsersByQuery({name:value})
//   })
  
  onMounted(() => {
    fetchRole();
  });
  watch(
  keyWord,
  (value) => {
    const q = value.trim();
    if (q) {
      roleStore.searchRoleByQuery({ name: q });
    } else {
      roleStore.fetchRole();
    }
  },
  {
    immediate: true,  
   
  }
);
 
  const handleCreateRole= () => {
    router.push('/roles/create')
  }
  const DetailRole =(roleId: any)=>{
    router.push(`/roles/${roleId}`)
  }
  const editRole = (roleId: any) => {
    router.push(`/roles/edit/${roleId}`)
  };
  </script>
  