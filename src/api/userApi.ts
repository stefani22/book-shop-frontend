import axiosInstance from '../axios/axios.ts';
import type { LoginRequest } from './types/user.ts';

const userApi = {
    login: (data: LoginRequest) => {
        return axiosInstance.post<string>('/auth/login', data);
    }
};

export default userApi;