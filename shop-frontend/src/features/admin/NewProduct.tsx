import ProductForm from './ProductForm';
import { ProductMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { createAdminProduct } from './productsAdminThunk';
import { selectAdminCreateLoading } from './productsAdminSlice';

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectAdminCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (product: ProductMutation) => {
    try {
      await dispatch(createAdminProduct(product)).unwrap();
      toast.success('Product was successfully created!');
      navigate('/products');
    } catch (e) {
      toast.error('Error creating product');
    }
  };

  return (
    <>
      {isCreateLoading ?  <CircularProgress /> :
        <ProductForm onSubmit={onSubmitForm}/>
      }
    </>
  );
};

export default NewProduct;