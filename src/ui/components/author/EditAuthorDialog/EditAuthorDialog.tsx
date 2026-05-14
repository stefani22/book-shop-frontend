import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { Author } from '../../../../api/types/author.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: Omit<Author, 'id'>) => Promise<void>;
    author: Author | null;
}

const EditAuthorDialog = ({ open, onClose, onEdit, author }: Props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [countryId, setCountryId] = useState('');

    useEffect(() => {
        if (author) {
            setName(author.name);
            setSurname(author.surname);
            setCountryId(String(author.countryId));
        }
    }, [author]);

    const handleSubmit = async () => {
        if (!author) return;
        await onEdit(author.id, { name, surname, countryId: Number(countryId) });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Author</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                <TextField label='Surname' value={surname} onChange={(e) => setSurname(e.target.value)} fullWidth/>
                <TextField label='Country ID' type='number' value={countryId} onChange={(e) => setCountryId(e.target.value)} fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAuthorDialog;