import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { Book } from '../../../../api/types/book.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
    book: Book | null;
}

const DeleteBookDialog = ({ open, onClose, onDelete, book }: Props) => {
    const handleDelete = async () => {
        if (!book) return;
        await onDelete(book.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete <strong>{book?.name}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBookDialog;