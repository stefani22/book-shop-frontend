import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { Link } from 'react-router';
import useLogin from '../../../../hooks/useLogin.ts';

const LoginPage = () => {
    const { login, loading, error } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        await login({ username, password });
    };

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    Login
                </Typography>

                {error && <Alert severity='error'>{error.message}</Alert>}

                <TextField
                    label='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />
                <TextField
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>

                <Typography sx={{ textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <Link to='/register'>Register</Link>
                </Typography>

            </Box>
        </Container>
    );
};

export default LoginPage;