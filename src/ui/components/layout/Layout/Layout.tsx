import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header/>
            <Container sx={{ my: 2, flexGrow: 1 }} maxWidth='lg'>
                <Outlet/>
            </Container>
            <Footer/>
        </Box>
    );
};

export default Layout;