import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { Book, CreateBookRequest } from '../../../../api/types/book.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: CreateBookRequest) => Promise<void>;
    book: Book | null;
}

const EditBookDialog = ({ open, onClose, onEdit, book }: Props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [availableCopies, setAvailableCopies] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [datePublished, setDatePublished] = useState('');

    useEffect(() => {
        if (book) {
            setName(book.name);
            setCategory(book.category);
            setAvailableCopies(String(book.availableCopies));
            setAuthorId(String(book.authorId ?? ''));
            setDatePublished(book.datePublished ?? '');
        }
    }, [book]);

    const handleSubmit = async () => {
        if (!book) return;
        await onEdit(book.id, {
            name,
            category,
            state: book.state,
            availableCopies: Number(availableCopies),
            authorId: Number(authorId),
            datePublished,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={category} label='Category' onChange={(e) => setCategory(e.target.value)}>
                        <MenuItem value='NOVEL'>Novel</MenuItem>
                        <MenuItem value='THRILLER'>Thriller</MenuItem>
                        <MenuItem value='HISTORY'>History</MenuItem>
                        <MenuItem value='FANTASY'>Fantasy</MenuItem>
                        <MenuItem value='BIOGRAPHY'>Biography</MenuItem>
                        <MenuItem value='CLASSICS'>Classics</MenuItem>
                        <MenuItem value='DRAMA'>Drama</MenuItem>
                        <MenuItem value='OTHER'>Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField label='Available Copies' type='number' value={availableCopies} onChange={(e) => setAvailableCopies(e.target.value)} fullWidth/>
                <TextField label='Author ID' type='number' value={authorId} onChange={(e) => setAuthorId(e.target.value)} fullWidth/>
                <TextField label='Date Published' type='date' value={datePublished} onChange={(e) => setDatePublished(e.target.value)} fullWidth slotProps={{ inputLabel: { shrink: true } }}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBookDialog;