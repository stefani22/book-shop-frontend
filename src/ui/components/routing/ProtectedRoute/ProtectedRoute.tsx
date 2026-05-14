import { Navigate, Outlet } from 'react-router';
import useAuth from '../../../../hooks/useAuth.ts';

interface Props {
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ requireAdmin = false }: Props) => {
    const { isLoggedIn, isAdmin } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to='/login' replace/>;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to='/' replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;