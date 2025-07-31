import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Permission } from '../types/permission';
import { getPermissions  } from '../api/index';
type NewPermission = Omit<Permission, '_id'>;
export const usePermissionStore = defineStore('Permission', () => {
const permissions = ref<Permission[]>([]);
 const loadingPerms = ref(false)
  const errorPerms = ref<string | null>(null)

const newPermission = reactive<NewPermission>({
    name: '',
    apiPath: '',
    description: '',
    method: '',
    module: ''
  });


const keyWord =ref('')

 async function fetchPermissions() {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      const res = await getPermissions({ page: 1, limit: 1000 })
      // ở đây res.data.data.data mới là mảng Permission[]
      const list = res.data?.data?.data ?? []
      console.log('list permission',list)
      permissions.value = list
      console.log('✅ Permissions fetched:',permissions.value)
    } catch (err: any) {
      console.error('❌ fetchPermissions failed:', err)
      errorPerms.value = err.message || 'Lỗi không xác định'
      permissions.value = []
    } finally {
      loadingPerms.value = false
    }
  }

return {
permissions,
fetchPermissions,
newPermission ,
 loadingPerms,
  errorPerms,
};
});