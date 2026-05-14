import axiosInstance from '../axios/axios.ts';
import type { Author } from './types/author.ts';

const authorApi = {
    findAll: () => {
        return axiosInstance.get<Author[]>('/authors');
    },
    findById: (id: number) => {
        return axiosInstance.get<Author>(`/authors/${id}`);
    }
};

export default authorApi;