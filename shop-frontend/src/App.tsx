import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Products from './features/products/containers/Products.tsx';
import NewProduct from './features/products/containers/NewProduct.tsx';
import RegisterPage from './users/RegisterPage.tsx';
import LoginPage from './users/LoginPage.tsx';
import SecuredRoute from './components/SecuredRoute/SecuredRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './users/usersSlice.ts';

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
            <Route path="/products/new" element={
              <SecuredRoute isAllowed={user && user.role === 'admin'}>
                <NewProduct />
              </SecuredRoute>
            } />
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;