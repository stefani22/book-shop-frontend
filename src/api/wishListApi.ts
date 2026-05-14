import axiosInstance from '../axios/axios.ts';
import type { WishList } from './types/wishlist.ts';

const wishlistApi = {
    get: () => {
        return axiosInstance.get<WishList>('/wishlist');
    },
    addBook: (bookId: number) => {
        return axiosInstance.post<WishList>(`/wishlist/add/${bookId}`);
    },
    removeBook: (bookId: number) => {
        return axiosInstance.delete<WishList>(`/wishlist/remove/${bookId}`);
    }
};

export default wishlistApi;