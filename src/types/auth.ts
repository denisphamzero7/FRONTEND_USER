
export interface LoginCredentials {
    username: string;
    password: string;
  }

  export interface RegisterCredentials {
    email: string;
    password: string;
    fullName?: string;
    roleId?: string;
    companyId?: string;
  }
  

  export interface TokenData {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
  }
  
  export interface AuthUser {
    id: string;
    email: string;
    username:string;
    password:string;
    roles: string[];
    companyId?: string;
    createdAt: string;
    updatedAt: string;
  }
  
 
  export interface AuthResponse {
    user: AuthUser;
    tokens: TokenData;
  }
  