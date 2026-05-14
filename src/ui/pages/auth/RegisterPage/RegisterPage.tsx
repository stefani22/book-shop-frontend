import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import useRegister from '../../../../hooks/useRegister.ts';

const RegisterPage = () => {
    const { register, loading, error } = useRegister();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_USER');

    const handleSubmit = async () => {
        await register({ username, password, role });
    };

    return (
        <Container maxWidth='xs'>
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    Register
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
                <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={role}
                        label='Role'
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value='ROLE_USER'>User</MenuItem>
                        <MenuItem value='ROLE_ADMINISTRATOR'>Administrator</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? 'Registering...' : 'Register'}
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterPage;