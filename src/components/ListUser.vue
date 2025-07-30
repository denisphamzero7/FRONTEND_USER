<template>
  <div class="overflow-auto">
    <!-- Thanh tiêu đề và nút tạo người dùng -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Danh sách người dùng</h2>
      <Input class="w-[500px]" v-model="keyWord" label="Tìm kiếm người dùng" type="text" placeholder="Nhập tên tìm kiếm" />
      <RoundButton variant="primary" @click="handleCreateUser">
        + Tạo người dùng
      </RoundButton>
    </div>

    <!-- Bảng dữ liệu -->
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-200">
        <tr>
          <th
            class="px-3 py-3 text-sm font-medium uppercase"
            v-for="(h, index) in Theader"
            :key="index"
          >
            {{ h }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="Theader.length" class="px-4 py-5 text-center">
            Đang tải dữ liệu...
          </td>
        </tr>

        <tr v-for="user in users" :key="user._id">
          <td class="px-3 py-3 text-center">{{ user.name }}</td>
          <td class="px-3 py-3 text-center">{{ user.email }}</td>
          <td class="px-3 py-3 text-center">{{ user.age }}</td>
          <td class="px-3 py-3 text-center">{{ user.gender }}</td>
          <td class="px-3 py-3 text-center space-x-2">
            <RoundButton variant="danger" @click="RemoveUser(user._id)">Xoá</RoundButton>
            <RoundButton variant="default" @click="editUser(user._id)">Chỉnh sửa</RoundButton>
            <RoundButton variant="default" @click="DetailUser(user._id)">Xem</RoundButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router"; 
import useUserApi from "../composable/useApi";
import RoundButton from "../components/RoundButton.vue";
import Input from './Input.vue';
const router = useRouter();
const Theader = ref(["Name", "Email", "Age", "Gender", "Action"]);

const { users, loading, error, fetchUsers, RemoveUser,form,keyWord,searchUsersByQuery } = useUserApi();

watch(keyWord,(value)=>{
  searchUsersByQuery({name:value})
})

onMounted(() => {
  fetchUsers();
});

const getuser = async ()=>{
  const user = await fetchUsers()
}
const handleCreateUser = () => {
  router.push('/users/create')
}
const DetailUser =(userId: any)=>{
  router.push(`/users/${userId}`)
}
const editUser = (userId: any) => {
  router.push(`/users/edit/${userId}`)
};
</script>
