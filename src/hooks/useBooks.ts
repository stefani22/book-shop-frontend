import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/bookApi.ts';
import type { Book, CreateBookRequest } from '../api/types/book.ts';

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookApi.findAll();
            setBooks(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred while loading books.'));
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: CreateBookRequest) => {
        await bookApi.add(data);
        await fetchBooks();
    }, [fetchBooks]);

    const onEdit = useCallback(async (id: number, data: CreateBookRequest) => {
        await bookApi.edit(id, data);
        await fetchBooks();
    }, [fetchBooks]);

    const onDelete = useCallback(async (id: number) => {
        await bookApi.delete(id);
        await fetchBooks();
    }, [fetchBooks]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchBooks();
    }, [fetchBooks]);

    return { books, loading, error, onAdd, onEdit, onDelete };
};

export default useBooks;