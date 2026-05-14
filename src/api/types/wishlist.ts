import type { Book } from './book.ts';

export interface WishList {
    id: number;
    books: Book[];
}