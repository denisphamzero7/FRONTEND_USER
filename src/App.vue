
<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<template>
  <div>
    <nav>
      <ul>
        <li>
        <RouterLink :to="{name:'UserList'}">Home</RouterLink>
        <RouterLink :to="{name:'Login'}">Login</RouterLink>
        <RouterLink :to="{name:'Register'}">Register</RouterLink>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
</style>
