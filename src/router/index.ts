// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import ListUser from '../components/ListUser.vue'
import CreateUser from '../components/CreateUser.vue'
import EditUser from '../components/EditUser.vue'
import DetailUser from '../components/DetailUser.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ListRole from '../components/ListRole.vue'
import DetailRole from '../components/DetailRole.vue'
import CreateRole from '../components/CreateRole.vue'
import EditRole from '../components/EditRole.vue'

import CreatePermission from '../components/CreatePermission.vue'
import EditPermission from '../components/EditPermission.vue'
import DetailPermission from '../components/DetailPermission.vue'
import Dashboard from '../views/Dashboard.vue'
const routes = [
  { path: '/', name: 'UserList', component: ListUser },
  { path: '/users/create', name: 'CreateUser', component: CreateUser },
  { path: '/users/edit/:userId', name: 'EditUser', component: EditUser },
  {path:'/users/:userId',name:'DetailUser', component:DetailUser},
  {path:'/auth/login',name:'Login', component:LoginView},
  {path:'/auth/register',name:'Register', component:RegisterView},

  {path:'/roles/',name:'Roles', component:ListRole},
  {path:'/roles/:roleId',name:'DetailRole', component:DetailRole},
  {path:'/roles/create',name:'NewRole', component:CreateRole},
  {path:'/auth/edit/roleId',name:'EditRole', component:EditRole},

  {path:'/permissions/',name:'Permissions', component:Permissions},
  {path:'/permissions/:permissionId',name:'DetailPermission', component:DetailPermission},
  {path:'/permissions/create',name:'NewPermission', component:CreatePermission},
  {path:'/permissions/edit/:permissionId',name:'EditRole', component:EditPermission},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
