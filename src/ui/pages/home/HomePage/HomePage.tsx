import { Box, Typography } from '@mui/material';

const HomePage = () => {
    return (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant='h3'>
                Welcome to BookShop
            </Typography>
            <Typography variant='h6' sx={{ mt: 2, color: 'text.secondary' }}>
                Use the navigation to browse books, authors and countries.
            </Typography>
        </Box>
    );
};

export default HomePage;