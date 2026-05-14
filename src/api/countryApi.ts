import axiosInstance from '../axios/axios.ts';
import type { Country } from './types/country.ts';

const countryApi = {
    findAll: () => {
        return axiosInstance.get<Country[]>('/countries');
    },
    findById: (id: number) => {
        return axiosInstance.get<Country>(`/countries/${id}`);
    }
};

export default countryApi;