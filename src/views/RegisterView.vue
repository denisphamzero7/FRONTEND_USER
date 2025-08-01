<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-6 text-center">Đăng ký</h1>
      <form @submit.prevent="handleRegister" class="space-y-4">

         <div class="grid grid-cols-2 gap-4 ">
        <Input  ref="inputElement" v-model="form.name" label="Tên" placeholder="Nhập tên" />
        <Input v-model="form.email" label="Email" type="email" placeholder="Nhập email" />
        <Input v-model="form.password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu" />
        <Input v-model="form.address" label="Địa chỉ" type="text" placeholder="Nhập Địa chỉ" />
        <Input v-model="form.age" label="Tuổi" type="number" placeholder="Nhập tuổi" />
        <Input v-model="form.gender" label="Giới tính" type="text" placeholder="Nhập giới tính" />
        <Input v-model="form.phone" label="Số điện thoại" type="number" placeholder="Nhập số điện thoại" />
         </div>
        <div class="flex items-center justify-center w-full"><RoundButton variant="danger"
          type="submit"
        >
         Đăng ký
        </RoundButton></div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, watch } from 'vue';

import Input from '../components/Input.vue';
import RoundButton from '../components/RoundButton.vue'
import { useNotification } from '../composable/useNotification';
import { useRouter } from 'vue-router';
  
  const router = useRouter();
import { useAuthStore } from '../store/auth';
// const formElement = ref<HTMLElement | null>(null)
// const inputElement = ref<HTMLInputElement | null>(null)
  const {addNotification} =useNotification()


const {form, register } = useAuthStore();

const handleRegister = async () => {
  try {
    await register();
    addNotification('Thành công rồi')
    router.push({ name: 'Login' });
  } catch (e) {
    addNotification('đăng nhập thất bại')
  }
};
</script>
