import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { CreateBookRequest } from '../../../../api/types/book.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onAdd: (data: CreateBookRequest) => Promise<void>;
}

const AddBookDialog = ({ open, onClose, onAdd }: Props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [availableCopies, setAvailableCopies] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [datePublished, setDatePublished] = useState('');

    const handleSubmit = async () => {
        await onAdd({
            name,
            category,
            state: 'GOOD',
            availableCopies: Number(availableCopies),
            authorId: Number(authorId),
            datePublished,
        });
        setName('');
        setCategory('');
        setAvailableCopies('');
        setAuthorId('');
        setDatePublished('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Book</DialogTitle>
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
                <Button variant='contained' onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookDialog;