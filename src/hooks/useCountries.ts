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

    useEffect(() => {
        void fetchCountries();
    }, [fetchCountries]);

    return { countries, loading, error };
};

export default useCountries;