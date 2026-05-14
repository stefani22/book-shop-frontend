import axiosInstance from '../axios/axios.ts';
import type { Country } from './types/country.ts';

const countryApi = {
    findAll: () => {
        return axiosInstance.get<Country[]>('/countries');
    },
    findById: (id: number) => {
        return axiosInstance.get<Country>(`/countries/${id}`);
    },
    add: (data: Omit<Country, 'id'>) => {
        return axiosInstance.post<Country>('/countries/add', data);
    },
    edit: (id: number, data: Omit<Country, 'id'>) => {
        return axiosInstance.put<Country>(`/countries/${id}/edit`, data);
    },
    delete: (id: number) => {
        return axiosInstance.delete<Country>(`/countries/${id}/delete`);
    }
};

export default countryApi;