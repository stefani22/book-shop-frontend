import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { Author } from '../../../../api/types/author.ts';

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
    author: Author | null;
}

const DeleteAuthorDialog = ({ open, onClose, onDelete, author }: Props) => {
    const handleDelete = async () => {
        if (!author) return;
        await onDelete(author.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Author</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete <strong>{author?.name} {author?.surname}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAuthorDialog;