import { Navigate, Outlet } from 'react-router';
import useAuth from '../../../../hooks/useAuth.ts';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to='/login' replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;