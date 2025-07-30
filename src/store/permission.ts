import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Permission } from '../types/permission';
import { getPermissions  } from '../api/index';
type NewPermission = Omit<Permission, '_id'>;
export const usePermissionStore = defineStore('Permission', () => {
const Permissions = ref<Permission[]>([]);
const error = ref<string | null>(null)
const loading = ref(false)

const newPermission = reactive<NewPermission>({
    name: '',
    apiPath: '',
    description: '',
    method: '',
    module: ''
  });


const keyWord =ref('')

const fetchPermissions = async()=> {
    loading.value = true;
    error.value = null;
try {
const response = await getPermissions();
const {data} = response.data
console.log('data',data);
Permissions.value = data;
return data;
} catch (error) {
console.error('fetchPermissions failed:', error);
throw error;
}
}

return {
Permissions,
fetchPermissions,
newPermission 
};
});