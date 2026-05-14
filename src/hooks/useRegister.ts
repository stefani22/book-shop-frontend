import { useState } from 'react';
import type { RegisterRequest } from '../api/types/user.ts';
import userApi from '../api/userApi.ts';
import { useNavigate } from 'react-router';
import useAuth from './useAuth.ts';

const useRegister = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const register = async (data: RegisterRequest) => {
        setLoading(true);
        setError(null);

        try {
            const response = await userApi.register(data);
            authLogin(response.data);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Registration failed. Please try again!'));
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, register };
};

export default useRegister;