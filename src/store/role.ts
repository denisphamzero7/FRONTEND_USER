import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
    Role
} from "../types/role";
import { getRoles ,createRole,deleteRole, updateRole  } from "../api/index";
type newRole = Omit<Role, '_id'>;
export const useRoleStore = defineStore("role", () => {
  const error = ref<string | null>(null)
const loading = ref(false)
const keyWord =ref('')
  const newRole = reactive<newRole>({
    name: "",
    isActive: true,
    description: "",
    permissions: [],
  });
  const roles = ref<Role[]>([]);


  const addRole = async () => {
    try {
      const response = await createRole(newRole);
      const data = response.data.data;
      console.log("data", data);
      roles.value.push(data)
      error.value = null
      return true
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
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
const fetchRoleId = async(id:string)=>{
  loading.value = true

  try {
    const data = await getRoleById(id)

     return data
  } catch (error) {
    console.log(error);
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
function getRoleById(id: string) {
  throw new Error("Function not implemented.");
}

