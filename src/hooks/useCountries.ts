import { useCallback, useEffect, useState } from 'react';
import countryApi from '../api/countryApi.ts';
import type { Country } from '../api/types/country.ts';

const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await countryApi.findAll();
            setCountries(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred while loading countries.'));
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (data: Omit<Country, 'id'>) => {
        await countryApi.add(data);
        await fetchCountries();
    }, [fetchCountries]);

    const onEdit = useCallback(async (id: number, data: Omit<Country, 'id'>) => {
        await countryApi.edit(id, data);
        await fetchCountries();
    }, [fetchCountries]);

    const onDelete = useCallback(async (id: number) => {
        await countryApi.delete(id);
        await fetchCountries();
    }, [fetchCountries]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchCountries();
    }, [fetchCountries]);

    return { countries, loading, error, onAdd, onEdit, onDelete };
};

export default useCountries;