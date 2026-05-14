import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import authorApi from '../../../../api/authorApi.ts';
import type { Author } from '../../../../api/types/author.ts';

const AuthorDetailsPage = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        authorApi.findById(Number(id))
            .then((response) => setAuthor(response.data))
            .catch((err) => setError(err instanceof Error ? err : new Error('An error occurred.')))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;
    if (!author) return null;

    return (
        <Box sx={{ mt: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant='h4'>{author.name} {author.surname}</Typography>
                    <Typography>Country ID: {author.countryId}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AuthorDetailsPage;