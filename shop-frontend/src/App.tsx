import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Products from './features/products/containers/Products.tsx';
import NewProduct from './features/products/containers/NewProduct.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/new" element={<NewProduct/>}/>
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;