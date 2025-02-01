import Grid from '@mui/material/Grid2';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu.tsx';

const AdminLayout = () => {
  return (
    <Grid container sx={{width: 200}}>
      <Grid>
        <AdminMenu />
      </Grid>

      <Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;