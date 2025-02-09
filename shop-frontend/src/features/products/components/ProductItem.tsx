import Grid from '@mui/material/Grid2';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import * as React from 'react';
import noPicture from '../../../assets/no-picture.png';
import { apiUrl } from '../../../globalConstants';
import { Category } from '../../../types';

interface Props {
  title: string;
  price: number;
  id: string;
  description: string;
  image?: string | null | undefined;
  category: Category;
}

const ProductItem: React.FC<Props> = ({title, price, id, image, category, description}) => {
  let productImage = noPicture;

  if (image) {
    productImage = apiUrl + '/' + image;
  }

  return (
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
        <Card>
          <CardHeader title={title}/>
          <CardMedia sx={{width: '100%', aspectRatio: '16/9',}} title={title} src={productImage} component='img'/>
          <CardContent>
            <p>{category.title}</p>
            <strong>Price: {price} KGS</strong>
            <p dangerouslySetInnerHTML={{__html: description}}/>
          </CardContent>
          <CardActions>
            <IconButton component={Link} to={'/products/' + id}>
              <ArrowForward/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
  );
};

export default ProductItem;