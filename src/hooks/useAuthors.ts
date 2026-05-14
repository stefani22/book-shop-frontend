import { useCallback, useEffect, useState } from 'react';
import authorApi from '../api/authorApi.ts';
import type { Author } from '../api/types/author.ts';

const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchAuthors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await authorApi.findAll();
            setAuthors(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred while loading authors.'));
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: Omit<Author, 'id'>) => {
        await authorApi.add(data);
        await fetchAuthors();
    }, [fetchAuthors]);

    const onEdit = useCallback(async (id: number, data: Omit<Author, 'id'>) => {
        await authorApi.edit(id, data);
        await fetchAuthors();
    }, [fetchAuthors]);

    const onDelete = useCallback(async (id: number) => {
        await authorApi.delete(id);
        await fetchAuthors();
    }, [fetchAuthors]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchAuthors();
    }, [fetchAuthors]);

    return { authors, loading, error, onAdd, onEdit, onDelete };
};

export default useAuthors;