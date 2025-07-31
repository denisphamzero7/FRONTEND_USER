import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
    Role
} from "../types/role";
import { getRoles ,createRole,deleteRole, updateRole,getRoleById  } from "../api/index";
type newRole = Omit<Role, '_id'>;
export const useRoleStore = defineStore("role", () => {
  const error = ref<string | null>(null)
const loading = ref(false)
const keyWord =ref('')
  let newRole = reactive<newRole>({
    name: "",
    isActive: true,
    description: "",
    permissions:[],
  });
  const roles = ref<Role[]>([]);
const getDefaultRole = (): newRole => ({
  name: '',
  isActive: true,
  description: '',
  permissions: [],
})
const resetRole = () => {
  Object.assign(newRole, getDefaultRole())
}

const addRole = async () => {
loading.value = true;
try {
const response = await createRole({ ...newRole });
roles.value.push(response.data.data);
error.value = null;
// Reset form
Object.assign(newRole, { name: "", isActive: true, description: "", permissions: [] });
return true;
} catch (err: any) {
error.value = err.message || 'Lỗi khi tạo role';
return false;
} finally {
loading.value = false;
}
};

const fetchRole = async ()=>{
  loading.value = true;
    try {
      const { data } = await getRoles();
      console.log('log role', data.data?.result);
      roles.value = data.data.result 
      return  roles.value
    } catch (e: any) {
      error.value = e.message || 'Lỗi khi tải danh sách vai trò';
      return [];
    } finally {
      loading.value = false;
    }
}
const findUserId =(id:string)=> roles.value.findIndex(
  (u)=>u._id ===id
)
const removeRole = async (id:string)=>{
  const index = findUserId(id);
      const orinalUser = roles.value[index];
       roles.value.splice(index,1);
       try {

        const  response = await deleteRole(id)
        if(!response)
          {
        throw new Error("không thể xoá")
        }
    } catch (e: any) {
      error.value = e.message || 'Không thể xoá user'
      roles.value.splice(index,0, orinalUser)
    }
}
  
const updateaRole = async (id:string,payload:any)=>{
  loading.value = true
  try {
    console.log('Sending payload edit:', JSON.stringify(payload, null, 2));
    const response = await  updateRole(id,payload)
    roles.value.push(response.data)
    error.value = null
    return true
  } catch (e: any) {
    error.value = e.message || 'Không thể tạo người dùng'
    return false
  } finally {
    loading.value = false
  }
}
const fetchRoleId = async (id: string) => {
  loading.value = true
  try {
    const res = await getRoleById(id)
    // Xem console.log để biết chính xác shape:
    console.log("fetchRoleId res.data =", res.data)

    // Nếu res.data.data tồn tại, lấy res.data.data, còn không lấy res.data
    const role = (res.data.data !== undefined ? res.data.data : res.data) as any

    Object.assign(newRole, {
      name: role.name,
      description: role.description,
      isActive: role.isActive,
      permissions: Array.isArray(role.permissions)
        ? role.permissions.map((p: any) => p._id ?? p) // nếu permission là object có _id, hoặc chính ID
        : [],
    })

    error.value = null
    return true
  } catch (e: any) {
    error.value = e.message || "Không thể lấy thông tin role"
    return false
  } finally {
    loading.value = false
  }
}
  return {
    newRole,
    roles,
    addRole,
    fetchRole,
    error,
    loading,
    keyWord,
    removeRole,
    updateaRole,
    fetchRoleId
  };
});


