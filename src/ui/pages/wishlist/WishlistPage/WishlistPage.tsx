import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import useWishlist from '../../../../hooks/useWishList.ts';

const WishlistPage = () => {
    const { wishlist, loading, error, onRemove } = useWishlist();

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>My Wishlist</Typography>
            {wishlist?.books.length === 0 ? (
                <Typography color='text.secondary'>Your wishlist is empty.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {wishlist?.books.map((book) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>{book.name}</Typography>
                                    <Typography color='text.secondary'>
                                        {book.authorName} {book.authorSurname}
                                    </Typography>
                                    <Typography>Category: {book.category}</Typography>
                                    <Typography>State: {book.state}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size='small' color='error' onClick={() => onRemove(book.id)}>
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default WishlistPage;