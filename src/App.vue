<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import NotificationList from './components/NotificationList.vue';
import { useAuthStore } from './store/auth';
import Dashboard from './views/Dashboard.vue';

const auth = useAuthStore();
auth.init();

const router = useRouter();

function handleLogout() {
  auth.logout();
  router.push({ name: 'Login' });
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
      
          <div class="flex items-center space-x-4">
            <RouterLink to="/" class="text-xl font-bold text-blue-600 hover:text-blue-800">LOGO</RouterLink>
           
          </div>


          <div class="flex items-center space-x-4">
            <template v-if="!auth.isAuthenticated">
              <RouterLink :to="{ name: 'Login' }" class="text-gray-700 hover:text-blue-500">Login</RouterLink>
              <RouterLink :to="{ name: 'Register' }" class="text-gray-700 hover:text-blue-500">Register</RouterLink>
            </template>
            <template v-else>
              <span class="text-sm text-gray-700">
                Xin chào, <strong>{{ auth.user?.username || auth.user?.email }}</strong>
              </span>
              <button @click="handleLogout" class="text-red-500 hover:underline">Logout</button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 p-4">
      <div class="bg-white p-4 shadow-md rounded-lg">
        <Dashboard />
      </div>
      <div class="bg-white p-4 shadow-md rounded-lg">
        <router-view />
      </div>
    </div>

    <!-- Notification -->
    <NotificationList />
  </div>
</template>

<style scoped>
/* Nếu cần tùy chỉnh thêm */
</style>
