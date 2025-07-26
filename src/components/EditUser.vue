<template>
    <div class="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 class="text-2xl font-semibold mb-6">Chỉnh sửa người dùng</h2>
  
      <form @submit.prevent="handleEditUser">
        <Input v-model="form.name" label="Tên người dùng" placeholder="Nhập tên" />
        <Input v-model="form.email" label="Email" type="email" placeholder="Nhập email" />
        <Input v-model="form.password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu mới hoặc để trống" />
        <Input v-model="form.age" label="Tuổi" type="number" placeholder="Nhập tuổi" />
        <Input v-model="form.phone" label="SĐT" type="number" placeholder="Nhập số điện thoại" />
  
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
          <select v-model="form.gender" class="w-full border-gray-300 rounded p-2">
            <option disabled value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
  
        <Input v-model="form.address" label="Địa chỉ" placeholder="Nhập địa chỉ" />
  
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
          <select v-model="form.role" class="w-full border-gray-300 rounded p-2">
            <option disabled value="">Chọn vai trò</option>
            <option v-for="role in roles" :key="role._id" :value="role._id">
              {{ role.name }}
            </option>
          </select>
        </div>
  
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
          <select v-model="form.companyId" class="w-full border-gray-300 rounded p-2">
            <option disabled value="">Chọn công ty</option>
            <option v-for="company in companies" :key="company._id" :value="company._id">
              {{ company?.name }}
            </option>
          </select>
        </div>
  
        <button
          type="submit"
          class="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cập nhật người dùng
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Input from './Input.vue';
  import useUserApi from '../composable/useApi';
  
  type Role = { _id: string; name: string };
  type Company = { _id: string; name: string };
  
  const route = useRoute();
  const router = useRouter();
  const { fetchcompanies, fetchRoles, fetchUserById, updateUser,form } = useUserApi();
  
  const userId = route.params?.userId as string; 

  
  const roles = ref<Role[]>([]);
  const companies = ref<Company[]>([]);
  
  onMounted(async () => {
    console.log('edit userId from route:', userId); 
  
    const userData = await fetchUserById(userId);
    console.log('Fetched user data:', userData); 
  
    if (userData) {
      form.value = {
        name: userData.name,
        email: userData.email,
        password: userData.password, 
        age: userData.age,
        phone: userData.phone,
        gender: userData.gender,
        address: userData.address,
        role: userData.role?._id || '',
        companyId: userData.company?._id || ''
      };
    }
  
    roles.value = await fetchRoles();
    companies.value = await fetchcompanies();
    console.log('Final companies:', companies.value);
  });
  
  const handleEditUser = async () => {
    const payload = {
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      ...(form.value.password && { password: form.value.password }),
      age: form.value.age,
      phone: form.value.phone,
      gender: form.value.gender,
      address: form.value.address.trim(),
      role: form.value.role,
      company: {
        _id: form.value.companyId,
        name: companies.value.find(c => c._id === form.value.companyId)?.name || ''
      }
    };
  
    const success = await updateUser(userId, payload);
    if (success) {
      router.push('/');
    }
  };
  </script>
  
  