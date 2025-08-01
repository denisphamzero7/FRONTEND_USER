<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-semibold mb-6">Chỉnh sửa quyền</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input v-model="form.name" label="Name" placeholder="Nhập name" />
      <Input
        v-model="form.apiPath"
        label="ApiPath"
        placeholder="Nhập đường dẫn api"
      />
      <Input v-model="form.method" label="Method" placeholder="Nhập method" />
      <Input v-model="form.module" label="Module" placeholder="Nhập Module" />
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
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, watch } from "vue";

import Input from "../components/Input.vue";
import { usePermissionStore } from "../store/permission";

const route = useRoute();
const router = useRouter();
const {
  fetchPermissions,
  loadingPerms,
  errorPerms,
  fetchPermissionId,
  updateaPermission,
} = usePermissionStore();
const id = route.params?.permissionId as string;
console.log(id);
const form = reactive({
  name: "",
  apiPath: "",
  method: "",
  module: "",
});

const loadData = async () => {
  const data = await fetchPermissionId(id);
  console.log("data :", data);
  if (data) {
    Object.assign(form, {
      name: data.data.name,
      apiPath: data.data.apiPath,
      method: data.data.method,
      module: data.data.module,
    });
  }
};
watch(
  () => form.module,
  (val) => {
    form.module = val.toUpperCase();
  }
);
watch(
  () => form.method,
  (val) => {
    form.method = val.toUpperCase();
  }
);
const handleSubmit = async () => {
  const success = await updateaPermission(id, { ...form });
  if (success) {
    router.push("/permissions");
  }
};

onMounted(() => {
  loadData();
  fetchPermissions();
});
</script>
