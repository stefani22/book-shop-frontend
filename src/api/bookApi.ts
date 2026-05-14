import axiosInstance from '../axios/axios.ts';
import type { Book, CreateBookRequest } from './types/book.ts';

const bookApi = {
    findAll: () => {
        return axiosInstance.get<Book[]>('/books');
    },
    findById: (id: number) => {
        return axiosInstance.get<Book>(`/books/${id}`);
    },
    add: (data: CreateBookRequest) => {
        return axiosInstance.post<Book>('/books/add', data);
    },
    edit: (id: number, data: CreateBookRequest) => {
        return axiosInstance.put<Book>(`/books/${id}/edit`, data);
    },
    delete: (id: number) => {
        return axiosInstance.delete<Book>(`/books/${id}/delete`);
    }
};

export default bookApi;