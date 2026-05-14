import { Box, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useBooks from '../../../../hooks/useBooks.ts';

const BooksPage = () => {
    const { books, loading, error } = useBooks();
    const navigate = useNavigate();

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>Books</Typography>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/books/${book.id}`)}>
                                <CardContent>
                                    <Typography variant='h6'>{book.name}</Typography>
                                    <Typography color='text.secondary'>
                                        {book.authorName} {book.authorSurname}
                                    </Typography>
                                    <Typography>Category: {book.category}</Typography>
                                    <Typography>State: {book.state}</Typography>
                                    <Typography>Available copies: {book.availableCopies}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BooksPage;