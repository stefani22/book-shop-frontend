import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { Author } from '../../../../api/types/author.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onAdd: (data: Omit<Author, 'id'>) => Promise<void>;
}

const AddAuthorDialog = ({ open, onClose, onAdd }: Props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [countryId, setCountryId] = useState('');

    const handleSubmit = async () => {
        await onAdd({ name, surname, countryId: Number(countryId) });
        setName('');
        setSurname('');
        setCountryId('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Author</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth/>
                <TextField label='Surname' value={surname} onChange={(e) => setSurname(e.target.value)} fullWidth/>
                <TextField label='Country ID' type='number' value={countryId} onChange={(e) => setCountryId(e.target.value)} fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAuthorDialog;