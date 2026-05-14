import { useCallback, useEffect, useState } from 'react';
import authorApi from '../api/authorApi.ts';
import type { Author } from '../api/types/author.ts';

const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await authorApi.findAll();
            setAuthors(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Грешка при вчитување на автори.'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { authors, loading, error };
};

export default useAuthors;