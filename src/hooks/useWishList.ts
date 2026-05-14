import { useCallback, useEffect, useState } from 'react';
import wishlistApi from '../api/wishListApi.ts';
import type { WishList } from '../api/types/wishlist.ts';

const useWishlist = () => {
    const [wishlist, setWishlist] = useState<WishList | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchWishlist = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await wishlistApi.get();
            setWishlist(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred.'));
        } finally {
            setLoading(false);
        }
    }, []);

    const onAdd = useCallback(async (bookId: number) => {
        await wishlistApi.addBook(bookId);
        await fetchWishlist();
    }, [fetchWishlist]);

    const onRemove = useCallback(async (bookId: number) => {
        await wishlistApi.removeBook(bookId);
        await fetchWishlist();
    }, [fetchWishlist]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchWishlist();
    }, [fetchWishlist]);

    return { wishlist, loading, error, onAdd, onRemove };
};

export default useWishlist;