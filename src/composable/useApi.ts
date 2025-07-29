// src/composable/useUserApi.ts
import { ref } from 'vue'
import { deleteUser, getUserById, getUsers,createUser, updateAUser, getCompanies, getRoles} from '../api'
interface user{
  name: string,
  email: string,
  password: string,
  age: number,
  phone: number,
  gender: string,
  address: string,
  role: string,

}
type NewUser = Omit<user,'id'>

export default function useUserApi() {
  const users = ref<any[]>([])
  const error = ref<string | null>(null)
  const loading = ref(false)
  const keyWord =ref('')
  const form = ref({
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    gender: '',
    address: '',
    role: '',
    companyId: ''
  });
  const fetchUsers = async () => {
    loading.value = true
    try {
      const { data } = await getUsers()
      console.log('log',data);
      users.value = data.data.result 
      return users.value
      error.value = null
    } catch (e: any) {
      error.value = e.message || 'Lỗi khi tải danh sách'
    } finally {
      loading.value = false
    }
  }
  const searchUsersByQuery = async (query: { name?: string; email?: string }) => {
    loading.value = true;
    try {
      const { data } = await getUsers(query);
      users.value = data.data.result;
      error.value = null;
      return users.value;
    } catch (e: any) {
      error.value = e.message || 'Không thể tìm người dùng';
      return [];
    } finally {
      loading.value = false;
    }
  }
  const findUserId =(id:string)=> users.value.findIndex(
    (u)=>u._id ===id
  )
  const fetchUserById = async (id: string) => {
    try {
      const { data } = await getUserById(id)
      console.log(' data đây',data.data);
      return data.data
    } catch (e: any) {
      error.value = e.message || `Lỗi khi tải user ${id}`
      return null
    }
  }
  const RemoveUser = async (id:string) =>{ 
      const index = findUserId(id);
      const orinalUser = users.value[index];
       users.value.splice(index,1);
       try {

        const  response = await deleteUser(id)
        if(!response)
          {
        throw new Error("không thể xoá")
        }
    } catch (e: any) {
      error.value = e.message || 'Không thể xoá user'
      users.value.splice(index,0, orinalUser)
    }

  }
  const createNewUser = async (payload: any) => {
    loading.value = true
    try {
      console.log('Sending payload:', JSON.stringify(payload, null, 2));
      const response = await createUser(payload)
      console.log('ckkk',response);
      users.value.push(response.data)
      error.value = null
      return true
    } catch (e: any) {
      error.value = e.message || 'Không thể tạo người dùng'
      return false
    } finally {
      loading.value = false
    }
  }
  const fetchcompanies = async () => {
    loading.value = true;
    try {
      const { data } = await getCompanies();
      console.log('log companies:', data.data.data);
      error.value = null;
      return data.data.data; 
    } catch (e: any) {
      error.value = e.message || 'Lỗi khi tải danh sách công ty';
      return []; // 
    } finally {
      loading.value = false;
    }
  };
  
  const fetchRoles = async () => {
    loading.value = true;
    try {
      const { data } = await getRoles();
      console.log('log role', data.data?.result);
      error.value = null;
      return data.data?.result || []; 
    } catch (e: any) {
      error.value = e.message || 'Lỗi khi tải danh sách vai trò';
      return [];
    } finally {
      loading.value = false;
    }
  };
  const updateUser = async (id:string,payload:any)=>{
    loading.value = true
    try {
      console.log('Sending payload edit:', JSON.stringify(payload, null, 2));
      const response = await updateAUser(id,payload)
      users.value.push(response.data)
      error.value = null
      return true
    } catch (e: any) {
      error.value = e.message || 'Không thể tạo người dùng'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    error,
    loading,
    form ,
    keyWord,
    fetchUsers,
    fetchUserById,
    RemoveUser,
    createNewUser,
    fetchcompanies,fetchRoles,
    updateUser,
    searchUsersByQuery
    

  }
}
