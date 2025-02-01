import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <Grid container>
      <Grid>
        <Typography variant='h6'>Admin Menu</Typography>
      </Grid>

      <Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/admin/products'>
              <ListItemText primary={'Products'}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to='/admin/categories'>
              <ListItemText primary={'Categories'}/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to='/admin/users'>
              <ListItemText primary={'Users'}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;