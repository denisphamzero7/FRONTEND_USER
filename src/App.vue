<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import NotificationList from './components/NotificationList.vue';
import { useAuthStore } from './store/auth';
const auth = useAuthStore();
auth.init();
const router = useRouter();

function handleLogout() {
  auth.logout();
  router.push({ name: 'Login' });
}
</script>

<template>
  <div>
    <nav class="bg-gray-100 p-4">
      <ul class="flex justify-end items-center gap-4 mr-10">
        <li>
          <RouterLink :to="{ name: 'UserList' }">Home</RouterLink>
        </li>
        <li v-if="!auth.isAuthenticated">
          <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
        </li>
        <li v-else class="flex items-center gap-2">
          <!-- Hiển thị tên hoặc email -->
          <span>Xin chào, <strong>{{ auth.user?.username || auth.user?.email }}</strong></span>
          <!-- Nút logout -->
          <button @click="handleLogout" class="underline">Logout</button>
        </li>
        <li v-if="!auth.isAuthenticated">
          <RouterLink :to="{ name: 'Register' }">Register</RouterLink>
        </li>
      </ul>
    </nav>

  <div>
    <router-view />
  </div>
    <NotificationList />
  </div>
</template>

<style scoped>
/* Ví dụ nhỏ để header đẹp hơn */
nav ul li {
  list-style: none;
}
</style>
