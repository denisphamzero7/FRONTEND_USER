<template>
    <div>
        <Input v-model="form.email" label="Email" type="email" placeholder="Nhập email" />
    </div>
</template>

<script setup lang="ts">
import useUserApi from '../composable/useApi';

 const {form,fetchUsers } = useUserApi();
</script>

<style scoped>

</style>