<template>
    <div class="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Thông tin người dùng
      </h1>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div class="flex flex-col">
          <span class="font-medium">Tên:</span>
          <span>{{ form.name }}</span>
        </div>
  
        <div class="flex flex-col">
          <span class="font-medium">Email:</span>
          <span>{{ form.email }}</span>
        </div>
  
        <div class="flex flex-col">
          <span class="font-medium">Số điện thoại:</span>
          <span>{{ form.phone ?? 'Không có số điện thoại' }}</span>
        </div>
  
        <div class="flex flex-col">
          <span class="font-medium">Giới tính:</span>
          <span>{{ form.gender }}</span>
        </div>
  
        <div class="flex flex-col sm:col-span-2">
          <span class="font-medium">Địa chỉ:</span>
          <span>{{ form.address }}</span>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserApi from '../composable/useApi';
import { useRoute } from 'vue-router';
const route = useRoute()
 const {form,fetchUserById } = useUserApi();
 const userId = route.params?.userId as string;
 console.log('ủe',userId);
 
 onMounted(async () => {
    const userData = await fetchUserById(userId);
    if(userData){
        form.value = {
        name: userData.name,
        email: userData.email,
        password: '', 
        age: userData.age,
        phone: userData.phone,
        gender: userData.gender,
        address: userData.address,
        role: userData.role?._id || '',
        companyId: userData.company?._id || ''
      };
    }
}
)
</script>

<style scoped>

</style>