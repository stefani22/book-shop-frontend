import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import ProtectedRoute from './ui/components/routing/ProtectedRoute/ProtectedRoute.tsx';
import LoginPage from './ui/pages/auth/LoginPage/LoginPage.tsx';
import RegisterPage from './ui/pages/auth/RegisterPage/RegisterPage.tsx';
import HomePage from './ui/pages/home/HomePage/HomePage.tsx';
import BooksPage from './ui/pages/books/BooksPage/BooksPage.tsx';
import BookDetailsPage from './ui/pages/books/BookDetailsPage/BookDetailsPage.tsx';
import AuthorsPage from './ui/pages/authors/AuthorsPage/AuthorsPage.tsx';
import AuthorDetailsPage from './ui/pages/authors/AuthorDetailsPage/AuthorDetailsPage.tsx';
import CountriesPage from './ui/pages/countries/CountriesPage/CountriesPage.tsx';
import CountryDetailsPage from './ui/pages/countries/CountryDetailsPage/CountryDetailsPage.tsx';
import WishlistPage from './ui/pages/wishlist/WishlistPage/WishlistPage.tsx';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/' element={<Layout/>}>
                    <Route element={<ProtectedRoute/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path='books' element={<BooksPage/>}/>
                        <Route path='books/:id' element={<BookDetailsPage/>}/>
                        <Route path='authors' element={<AuthorsPage/>}/>
                        <Route path='authors/:id' element={<AuthorDetailsPage/>}/>
                        <Route path='countries' element={<CountriesPage/>}/>
                        <Route path='countries/:id' element={<CountryDetailsPage/>}/>
                        <Route path='wishlist' element={<WishlistPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;