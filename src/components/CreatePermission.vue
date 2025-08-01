<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 class="text-2xl font-semibold mb-6">Chỉnh sửa quyền</h2>
  
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input v-model="newPermission.name" label="Name" placeholder="Nhập name" />
        <Input
          v-model="newPermission.apiPath"
          label="ApiPath"
          placeholder="Nhập đường dẫn api"
        />
        <Input v-model="newPermission.method" label="Method" placeholder="Nhập method" />
        <Input v-model="newPermission.module" label="Module" placeholder="Nhập Module" />
        <div class="flex justify-end space-x-2">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            :disabled="loadingPerms"
          >
            {{ loadingPerms ? "Đang cập nhật..." : "Cập nhật" }}
          </button>
        </div>
  
        <p v-if="errorPerms" class="text-red-500">{{ errorPerms }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  import { onMounted, watch } from "vue";
  
  import Input from "../components/Input.vue";
  import { usePermissionStore } from "../store/permission";
  
 
  const router = useRouter();
  const {
    newPermission,
    addPermission,
    fetchPermissions,
    loadingPerms,
    errorPerms,
  } = usePermissionStore();

  watch(
    () => newPermission.module,
    (val) => {
        newPermission.module = val.toUpperCase();
    }
  );
  watch(
    () => newPermission.method,
    (val) => {
        newPermission.method = val.toUpperCase();
    }
  );
  const handleSubmit = async () => {
    const success = await addPermission();
    if (success) {
      router.push("/permissions");
    }
  };
  
  onMounted(() => {
    fetchPermissions();
  });
  </script>
  