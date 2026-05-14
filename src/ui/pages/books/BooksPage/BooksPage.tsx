import { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useBooks from '../../../../hooks/useBooks.ts';
import useAuth from '../../../../hooks/useAuth.ts';
import type { Book } from '../../../../api/types/book.ts';
import AddBookDialog from '../../../components/book/AddBookDialog/AddBookDialog.tsx';
import EditBookDialog from '../../../components/book/EditBookDialog/EditBookDialog.tsx';
import DeleteBookDialog from '../../../components/book/DeleteBookDialog/DeleteBookDialog.tsx';

const BooksPage = () => {
    const { books, loading, error, onAdd, onEdit, onDelete } = useBooks();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selected, setSelected] = useState<Book | null>(null);

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h4'>Books</Typography>
                {isAdmin && (
                    <Button variant='contained' onClick={() => setAddOpen(true)}>
                        Add Book
                    </Button>
                )}
            </Box>

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
                            {isAdmin && (
                                <CardActions>
                                    <Button size='small' onClick={() => { setSelected(book); setEditOpen(true); }}>
                                        Edit
                                    </Button>
                                    <Button size='small' color='error' onClick={() => { setSelected(book); setDeleteOpen(true); }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <AddBookDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={onAdd}/>
            <EditBookDialog open={editOpen} onClose={() => setEditOpen(false)} onEdit={onEdit} book={selected}/>
            <DeleteBookDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onDelete={onDelete} book={selected}/>
        </Box>
    );
};

export default BooksPage;