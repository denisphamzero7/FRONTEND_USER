<template>
    <div>
<h1> Thông tin người dùng</h1>
<div class="grid grid-cols-2 mx-auto my-3">
<span>Tên: {{ form.name }}</span>
<span>Email: {{ form.email }}</span>
<span>Số điện thoại:{{ form.phone??" không có số điện thoại"}}</span>
<span> Giới tính: {{ form.gender }}</span>
<span> Địa chỉ :{{ form.address }}</span>


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