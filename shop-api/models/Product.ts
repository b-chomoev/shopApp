import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    image: String,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;