import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/bookApi.ts';
import type { Book } from '../api/types/book.ts';

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await bookApi.findAll();
            setBooks(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Грешка при вчитување на книги.'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { books, loading, error };
};

export default useBooks;