import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { Country } from '../../../../api/types/country.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onAdd: (data: Omit<Country, 'id'>) => Promise<void>;
}

const AddCountryDialog = ({ open, onClose, onAdd }: Props) => {
    const [name, setName] = useState('');
    const [continent, setContinent] = useState('');

    const handleSubmit = async () => {
        await onAdd({ name, continent });
        setName('');
        setContinent('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Country</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                    label='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label='Continent'
                    value={continent}
                    onChange={(e) => setContinent(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCountryDialog;