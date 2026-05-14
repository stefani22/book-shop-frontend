import { useCallback, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../contexts/authContext.ts';
import * as React from 'react';

interface JwtPayload {
    sub: string;
    role: string;
}

const getRole = (token: string | null): string | null => {
    if (!token) return null;
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role;
    } catch {
        return null;
    }
};

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
        role: getRole(token),
        isLoggedIn: !!token,
        isAdmin: getRole(token) === 'ROLE_ADMINISTRATOR',
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