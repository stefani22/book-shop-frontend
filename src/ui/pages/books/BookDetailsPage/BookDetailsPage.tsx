import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import bookApi from '../../../../api/bookApi.ts';
import type { Book } from '../../../../api/types/book.ts';

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        bookApi.findById(Number(id))
            .then((response) => setBook(response.data))
            .catch((err) => setError(err instanceof Error ? err : new Error('An error occurred.')))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;
    if (!book) return null;

    return (
        <Box sx={{ mt: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant='h4'>{book.name}</Typography>
                    <Typography variant='h6' color='text.secondary'>
                        {book.authorName} {book.authorSurname}
                    </Typography>
                    <Typography>Category: {book.category}</Typography>
                    <Typography>State: {book.state}</Typography>
                    <Typography>Available copies: {book.availableCopies}</Typography>
                    <Typography>Date published: {book.datePublished}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BookDetailsPage;