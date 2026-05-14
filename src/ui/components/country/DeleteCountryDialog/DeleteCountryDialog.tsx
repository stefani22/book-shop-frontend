import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { Country } from '../../../../api/types/country.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
    country: Country | null;
}

const DeleteCountryDialog = ({ open, onClose, onDelete, country }: Props) => {
    const handleDelete = async () => {
        if (!country) return;
        await onDelete(country.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Country</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete <strong>{country?.name}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCountryDialog;