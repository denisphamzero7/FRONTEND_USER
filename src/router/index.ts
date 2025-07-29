// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import ListUser from '../components/ListUser.vue'
import CreateUser from '../components/CreateUser.vue'
import EditUser from '../components/EditUser.vue'
import DetailUser from '../components/DetailUser.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
const routes = [
  { path: '/', name: 'UserList', component: ListUser },
  { path: '/users/create', name: 'CreateUser', component: CreateUser },
  { path: '/users/edit/:userId', name: 'EditUser', component: EditUser },
  {path:'/users/:userId',name:'DetailUser', component:DetailUser},
  {path:'/auth/login',name:'Login', component:LoginView},
  {path:'/auth/register',name:'Register', component:RegisterView}
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
