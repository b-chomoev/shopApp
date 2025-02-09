import Grid from '@mui/material/Grid2';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const AdminLayout = () => {
  return (
    <Grid container>
      <Grid sx={{width: 200}}>
        <AdminMenu />
      </Grid>

      <Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;