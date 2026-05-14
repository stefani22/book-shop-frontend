import axiosInstance from '../axios/axios.ts';
import type { Book } from './types/book.ts';

const bookApi = {
    findAll: () => {
        return axiosInstance.get<Book[]>('/books');
    },
    findById: (id: number) => {
        return axiosInstance.get<Book>(`/books/${id}`);
    }
};

export default bookApi;