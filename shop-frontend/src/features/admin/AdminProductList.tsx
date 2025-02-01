import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';

const AdminProductList = () => {
  const user = useAppSelector(selectUser);

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