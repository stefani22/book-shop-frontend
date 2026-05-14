import axiosInstance from '../axios/axios.ts';
import type { Author } from './types/author.ts';

const authorApi = {
    findAll: () => {
        return axiosInstance.get<Author[]>('/authors');
    },
    findById: (id: number) => {
        return axiosInstance.get<Author>(`/authors/${id}`);
    },
    add: (data: Omit<Author, 'id'>) => {
        return axiosInstance.post<Author>('/authors/add', data);
    },
    edit: (id: number, data: Omit<Author, 'id'>) => {
        return axiosInstance.put<Author>(`/authors/${id}/edit`, data);
    },
    delete: (id: number) => {
        return axiosInstance.delete<Author>(`/authors/${id}/delete`);
    }
};

export default authorApi;