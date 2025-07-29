<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 class="text-2xl font-semibold mb-6 text-center">Đăng nhập</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <Input v-model="credentials.username" label="Tên người dùng" placeholder="Nhập tên" />
          <Input v-model="credentials.password" label="Mật khẩu" type="password" placeholder="Nhập mật khẩu" />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Input from '../components/Input.vue';
  import { useAuthStore } from '../store/auth';
  
  const { credentials, login } = useAuthStore();
  
  const handleLogin = async () => {
    try {
      await login();
      alert('Đăng nhập thành công');
      
    } catch (e) {
      alert('Đăng nhập thất bại');
    }
  };
  </script>
  