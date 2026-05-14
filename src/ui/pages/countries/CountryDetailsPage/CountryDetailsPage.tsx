import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import countryApi from '../../../../api/countryApi.ts';
import type { Country } from '../../../../api/types/country.ts';

const CountryDetailsPage = () => {
    const { id } = useParams();
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        countryApi.findById(Number(id))
            .then((response) => setCountry(response.data))
            .catch((err) => setError(err instanceof Error ? err : new Error('An error occurred.')))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;
    if (!country) return null;

    return (
        <Box sx={{ mt: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant='h4'>{country.name}</Typography>
                    <Typography>Continent: {country.continent}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CountryDetailsPage;