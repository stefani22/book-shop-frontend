import { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext.ts';
import * as React from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    const login = useCallback((jwtToken: string) => {
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
    }, []);

    const value = useMemo(() => ({
        token,
        isLoggedIn: !!token,
        login,
        logout
    }), [token, login, logout]);

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;