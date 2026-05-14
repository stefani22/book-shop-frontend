import axiosInstance from '../axios/axios.ts';
import type { LoginRequest, RegisterRequest } from './types/user.ts';

const userApi = {
    login: (data: LoginRequest) => {
        return axiosInstance.post<string>('/auth/login', data);
    },
    register: (data: RegisterRequest) => {
        return axiosInstance.post<string>('/auth/register', data);
    }
};

export default userApi;