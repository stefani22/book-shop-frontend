import { Box, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useCountries from '../../../../hooks/useCountries.ts';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();
    const navigate = useNavigate();

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>Countries</Typography>
            <Grid container spacing={2}>
                {countries.map((country) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={country.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/countries/${country.id}`)}>
                                <CardContent>
                                    <Typography variant='h6'>{country.name}</Typography>
                                    <Typography color='text.secondary'>{country.continent}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CountriesPage;