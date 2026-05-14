import { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useAuthors from '../../../../hooks/useAuthors.ts';
import useAuth from '../../../../hooks/useAuth.ts';
import type { Author } from '../../../../api/types/author.ts';
import AddAuthorDialog from '../../../components/author/AddAuthorDialog/AddAuthorDialog.tsx';
import EditAuthorDialog from '../../../components/author/EditAuthorDialog/EditAuthorDialog.tsx';
import DeleteAuthorDialog from '../../../components/author/DeleteAuthorDialog/DeleteAuthorDialog.tsx';

const AuthorsPage = () => {
    const { authors, loading, error, onAdd, onEdit, onDelete } = useAuthors();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selected, setSelected] = useState<Author | null>(null);

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h4'>Authors</Typography>
                {isAdmin && (
                    <Button variant='contained' onClick={() => setAddOpen(true)}>
                        Add Author
                    </Button>
                )}
            </Box>

            <Grid container spacing={2}>
                {authors.map((author) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={author.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/authors/${author.id}`)}>
                                <CardContent>
                                    <Typography variant='h6'>{author.name} {author.surname}</Typography>
                                </CardContent>
                            </CardActionArea>
                            {isAdmin && (
                                <CardActions>
                                    <Button size='small' onClick={() => { setSelected(author); setEditOpen(true); }}>
                                        Edit
                                    </Button>
                                    <Button size='small' color='error' onClick={() => { setSelected(author); setDeleteOpen(true); }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <AddAuthorDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={onAdd}/>
            <EditAuthorDialog open={editOpen} onClose={() => setEditOpen(false)} onEdit={onEdit} author={selected}/>
            <DeleteAuthorDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onDelete={onDelete} author={selected}/>
        </Box>
    );
};

export default AuthorsPage;