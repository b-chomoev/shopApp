import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useEffect } from 'react';
import { fetchAdminProducts } from './productsAdminThunk.ts';

const AdminProductList = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  return (
    <div>
      <Grid container>
        {user && user.role === 'admin' && (
          <Button color="primary" component={Link} to="/admin/products/new">
            Add product
          </Button>
        )}
      </Grid>
    </div>
  );
};

export default AdminProductList;