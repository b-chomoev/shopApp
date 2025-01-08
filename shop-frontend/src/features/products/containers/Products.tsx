import Grid from '@mui/material/Grid2';
import { Button, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchProducts } from '../productsThunk.ts';
import { selectFetchLoading, selectProductsItems } from '../productsSlice.ts';
import ProductItem from '../components/ProductItem.tsx';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsItems);
  const isFetchProductsLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h4">Products</Typography>
        </Grid>

        <Grid>
          <Button color="primary" component={Link} to="/products/new">
            Add product
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={1}>

        {isFetchProductsLoading ? <CircularProgress /> :
          <>
            {products.length === 0 && !isFetchProductsLoading ? <Typography variant="h6">No products yet</Typography> :
              <>
                {products.map(product => (
                  <ProductItem
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </>
            }
          </>
        }
      </Grid>
    </Grid>
  );
};

export default Products;