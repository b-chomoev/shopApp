import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useEffect } from 'react';
import { fetchAdminProducts } from './productsAdminThunk.ts';
import { selectAdminProductsItems } from './productsAdminSlice.ts';
import { Product } from '../../types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const AdminProductList = () => {
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectAdminProductsItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const columns: GridColDef<Product>[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      valueGetter: (_value: string, row: Product) => row.category.title,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      sortable: true,
    },
  ];

  return (
    <div>
      <Grid container>
        {user && user.role === 'admin' && (
          <Button color="primary" component={Link} to="/admin/products/new">
            Add product
          </Button>
        )}
      </Grid>

      <Grid>
        <DataGrid
          getRowId={(row) => row._id}
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Grid>
    </div>
  );
};

export default AdminProductList;