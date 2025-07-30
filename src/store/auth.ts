import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  TokenData,
} from "../types/auth";
import { login as loginApi, register as registerApi } from "../api/index";

export const useAuthStore = defineStore("auth", () => {
  const credentials = reactive<LoginCredentials>({
    username: "",
    password: "",
  });
  const form = <RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    address:"",
    age: 0,
    gender: "",
    phone: 0,
  });
  const user = ref<AuthUser | null>(null);
  const tokens = ref<TokenData | null>(null);
  const isAuthenticated = ref(false);
  function init() {
    const rawUser = localStorage.getItem("user");
    const rawAccess = localStorage.getItem("accessToken");
    const rawRefresh = localStorage.getItem("refreshToken");
    if (rawUser && rawAccess) {
      user.value = JSON.parse(rawUser);
      tokens.value = { accessToken: rawAccess, refreshToken: rawRefresh || undefined };
      isAuthenticated.value = true;
    }
  }
  const login = async () => {
    try {
      const response = await loginApi(credentials);
      const data = response.data.data;
      console.log("data", data);
      user.value = data.user;
      console.log(user.value);
      tokens.value = { accessToken: data.access_token, refreshToken: data.refresh_token };
      isAuthenticated.value = true;
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user",JSON.stringify(data.user))
      localStorage.setItem("accessToken", data.access_token);
    
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async () => {
    try {
      const response = await registerApi(form);
      const data = response.data.data;
      user.value = data.user;
      tokens.value = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
      isAuthenticated.value = true;
      localStorage.setItem("accessToken", data.access_token);
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };
  
  const logout = () => {
    user.value = null;
    tokens.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("accessToken");
  };

  return {
    credentials,
    form,
    user,
    tokens,
    isAuthenticated,
    login,
    register,
    logout,
    init
  };
});
