import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { Permission } from '../types/permission';
import { getPermissions,deletePermission,getPermissionId, updatePermission,createPermission} from '../api/index';
type NewPermission = Omit<Permission, '_id'>;
export const usePermissionStore = defineStore('permission', () => {
const permissions = ref<Permission[]>([]);
 const loadingPerms = ref(false)
const errorPerms = ref<string | null>(null)
//  const keyWord =ref<string|null>(null)
const newPermission = reactive<NewPermission>({
    name: '',
    apiPath: '',
    method: '',
    module: ''
  });
const keyWord =ref('')



 async function fetchPermissions() {
    loadingPerms.value = true
    errorPerms.value = null
    try {
      const res = await getPermissions()
     
      const list = res.data?.data?.data ?? []
      console.log('list permission',list)
      permissions.value = list
      console.log('Permissions fetched:',permissions.value)
    } catch (err: any) {
      console.error('fetchPermissions failed:', err)
      errorPerms.value = err.message || 'Lỗi không xác định'
      permissions.value = []
    } finally {
      loadingPerms.value = false
    }
  }
async function fetchPermissionId(id:string) {
  loadingPerms.value=true
  errorPerms.value = null
  try {
    const res = await getPermissionId(id)
    console.log(res.data?.data);
    return res.data?.data
   
  } catch (err:any) {
    console.error('fetchPermissions failed:', err)
    errorPerms.value = err.message || 'Lỗi không xác định'
    permissions.value = []
  }
}
const searchPermissionByQuery = async (query: { name?: string }) => {
  loadingPerms.value = true;
  try {
    const res = await getPermissions(query);
    const list = res.data?.data?.data ?? [];
    permissions.value = list;
    return list;
  } catch (e: any) {
    errorPerms.value = e.message || 'Không thể tìm quyền ds';
    return [];
  } finally {
    loadingPerms.value = false;
  }
}
async function addPermission() {
  loadingPerms.value=true
  errorPerms.value = null
  try {
    const res = await createPermission({...newPermission})
    console.log('res:',res);
      permissions.value=res.data
      Object.assign(newPermission, { name: "", apiPath: "", method: "", module: ""});
  } catch (err:any) {
    console.error('addPermissions failed:', err)
    errorPerms.value = err.message || 'Lỗi không xác định'
    permissions.value = []
  }
}
async function updateaPermission(id:string,payload:any) {
  loadingPerms.value=true
  errorPerms.value = null
  try {
    const res = await updatePermission(id,payload)
      permissions.value=res.data
      Object.assign(newPermission, { name: "", apiPath: "", method: "", module: ""});
      return true
  } catch (err:any) {
    console.error('addPermissions failed:', err)
    errorPerms.value = err.message || 'Lỗi không xác định'
    permissions.value = []
  }
}
const findUserId =(id:string)=> permissions.value.findIndex(
  (u)=>u._id ===id
)
const removePermission = async (id:string)=>{
  const index = findUserId(id);
      const orinalUser = permissions.value[index];
       permissions.value.splice(index,1);
       try {

        const  response = await deletePermission(id)
        if(!response)
          {
        throw new Error("không thể xoá")
        }
    } catch (e: any) {
      e.value = e.message || 'Không thể xoá '
      permissions.value.splice(index,0, orinalUser)
    }
}
  

return {
permissions,
fetchPermissions,
newPermission ,
 loadingPerms,
  errorPerms,
  removePermission,
  keyWord,
  fetchPermissionId,
  addPermission,
  updateaPermission,
  searchPermissionByQuery 
};
});