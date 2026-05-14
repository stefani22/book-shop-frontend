import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { Country } from '../../../../api/types/country.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: Omit<Country, 'id'>) => Promise<void>;
    country: Country | null;
}

const EditCountryDialog = ({ open, onClose, onEdit, country }: Props) => {
    const [name, setName] = useState('');
    const [continent, setContinent] = useState('');

    useEffect(() => {
        if (country) {
            setName(country.name);
            setContinent(country.continent);
        }
    }, [country]);

    const handleSubmit = async () => {
        if (!country) return;
        await onEdit(country.id, { name, continent });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Country</DialogTitle>
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
                <Button variant='contained' onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCountryDialog;