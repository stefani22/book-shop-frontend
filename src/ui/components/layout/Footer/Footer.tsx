import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component='footer'
            sx={{
                py: 2,
                px: 4,
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'white',
                textAlign: 'center',
            }}
        >
            <Typography variant='body2'>
                © {new Date().getFullYear()} BookShop
            </Typography>
        </Box>
    );
};

export default Footer;