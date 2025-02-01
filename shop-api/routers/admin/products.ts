import express from "express";
import {ProductWithoutId} from "../../types";
import {imagesUpload} from "../../multer";
import Product from "../../models/Product";
import Category from "../../models/Category";

const productsAdminRouter = express.Router();

productsAdminRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().populate("category");
        res.send(products);
    } catch (e) {
        next(e);
    }
});

productsAdminRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

    if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) res.status(404).send('Not Found category');
    }

    try {
        const product: ProductWithoutId = new Product({
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? 'images' + req.file.filename : null,
        });

        await product.save();
        res.send(product);
    } catch (e) {
        next(e);
    }
});

export default productsAdminRouter;
