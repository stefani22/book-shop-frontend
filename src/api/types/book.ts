export interface Book {
    id: number;
    name: string;
    state: string;
    category: string;
    availableCopies: number;
    authorId: number | null;
    authorName: string | null;
    authorSurname: string | null;
    datePublished: string | null;
}

export interface CreateBookRequest {
    name: string;
    category: string;
    authorId: number;
    state: string;
    datePublished: string;
    availableCopies: number;
}