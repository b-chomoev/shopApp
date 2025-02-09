import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Products from './features/products/containers/Products';
import NewProduct from './features/admin/NewProduct';
import RegisterPage from './features/users/RegisterPage';
import LoginPage from './features/users/LoginPage';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import AdminLayout from './features/admin/AdminLayout';
import AdminProductList from './features/admin/AdminProductList';
import AdminCategoriesList from './features/admin/AdminCategoriesList';

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <CssBaseline />
            <header>
                <AppToolbar />
            </header>

            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Products />}/>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>
                        <Route path="/products" element={<Products />}/>
                        <Route path='/admin' element={
                            <SecuredRoute isAllowed={user && user.role === 'admin'}>
                                <AdminLayout />
                            </SecuredRoute>
                        }>
                            <Route path='' element={<AdminProductList />} />
                            <Route path='products' element={<AdminProductList />} />
                            <Route path='categories' element={<AdminCategoriesList />} />
                            <Route path='products/new' element={<NewProduct />} />
                        </Route>
                        <Route path="*" element={(<h1>Not found</h1>)}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
