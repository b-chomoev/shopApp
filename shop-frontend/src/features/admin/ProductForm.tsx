import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { ProductMutation } from '../../types';
import * as React from 'react';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchCategories } from '../categories/categoriesThunk.ts';
import { selectCategoriesItems } from '../categories/categoriesSlice.ts';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface Props {
  onSubmit: (product: ProductMutation) => void;
}

const initialState = {
  category: '',
  title: '',
  price: '',
  description: '',
  image: null,
};

const ProductForm: React.FC<Props> = ({onSubmit}) => {
  const [form, setForm] = useState<ProductMutation>(initialState);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategoriesItems);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({...form});
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

const selectChangeHandler = (e: SelectChangeEvent) => {
  const {name, value} = e.target;
  setForm(prevState => ({ ...prevState, [name]: value}));
};

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  }

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        {categories.length === 0 ? 'null' :
          <Grid size={{xs: 12}}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                id="category"
                labelId='category'
                name="category"
                required
                label="Category"
                value={form?.category}
                onChange={selectChangeHandler}
              >
                <MenuItem value='' disabled>Select category</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        }

        <Grid size={{xs: 12}}>
          <TextField
            id="title"
            name="title"
            label="Title"
            required
            value={form.title}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <TextField
            id="price"
            name="price"
            required
            label="Price"
            value={form.price}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <TextField
            multiline
            id="description"
            name="description"
            label="Description"
            value={form.description}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{xs: 12}}>
          <FileInput name='image' label='Image' onGetFile={fileEventChangeHandler}/>
        </Grid>

        <Grid>
          <Button type="submit" color="primary">Create</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;