<<<<<<< HEAD:shop-frontend/src/features/admin/NewProduct.tsx
import ProductForm from './ProductForm.tsx';
import { ProductMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { createAdminProduct } from './productsAdminThunk.ts';
import { selectAdminCreateLoading } from './productsAdminSlice.ts';
=======
import ProductForm from "../components/ProductForm.tsx";
import { ProductMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { createProduct } from "../productsThunk.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { selectCreateLoading } from "../productsSlice.ts";
>>>>>>> 80e8f09 (Some changes.):shop-frontend/src/features/products/containers/NewProduct.tsx

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectAdminCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (product: ProductMutation) => {
    try {
<<<<<<< HEAD:shop-frontend/src/features/admin/NewProduct.tsx
      await dispatch(createAdminProduct(product)).unwrap();
      toast.success('Product was successfully created!');
      navigate('/products');
=======
      await dispatch(createProduct(product)).unwrap();
      toast.success("Product was successfully created!");
      navigate("/products");
>>>>>>> 80e8f09 (Some changes.):shop-frontend/src/features/products/containers/NewProduct.tsx
    } catch (e) {
      toast.error("Error creating product");
    }
  };

  return (
    <>
      {isCreateLoading ? (
        <CircularProgress />
      ) : (
        <ProductForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewProduct;
