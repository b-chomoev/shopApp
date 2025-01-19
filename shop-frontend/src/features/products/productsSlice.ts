import { Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchProducts } from './productsThunk.ts';
import { RootState } from '../../app/store.ts';

interface IProductsState {
  items: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IProductsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectProductsItems = (state: RootState) => state.products.items;
export const selectFetchLoading = (state: RootState) => state.products.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.products.createLoading;

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.createLoading = false;
      })
  }
});

export const productsReducer = productsSlice.reducer;