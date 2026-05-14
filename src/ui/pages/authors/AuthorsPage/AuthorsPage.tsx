import { Box, Card, CardActionArea, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useAuthors from '../../../../hooks/useAuthors.ts';

const AuthorsPage = () => {
    const { authors, loading, error } = useAuthors();
    const navigate = useNavigate();

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>Authors</Typography>
            <Grid container spacing={2}>
                {authors.map((author) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={author.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/authors/${author.id}`)}>
                                <CardContent>
                                    <Typography variant='h6'>{author.name} {author.surname}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AuthorsPage;