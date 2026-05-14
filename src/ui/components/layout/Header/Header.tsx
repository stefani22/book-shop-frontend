import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth.ts';

const pages = [
    { path: '/', name: 'Home' },
    { path: '/books', name: 'Books' },
    { path: '/authors', name: 'Authors' },
    { path: '/countries', name: 'Countries' },
];

const Header = () => {
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position='static'>
            <Toolbar sx={{ display: 'flex' }}>
                <Typography variant='h6' sx={{ mr: 3 }}>
                    BookShop
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                    {pages.map((page) => (
                        <Button
                            key={page.path}
                            component={Link}
                            to={page.path}
                            sx={{ color: 'white' }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {!isLoggedIn ? (
                        <>
                            <Button color='inherit' component={Link} to='/login'>Login</Button>
                            <Button color='inherit' component={Link} to='/register'>Register</Button>
                        </>
                    ) : (
                        <Button color='inherit' onClick={handleLogout}>Logout</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;