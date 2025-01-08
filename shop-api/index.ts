import express from "express";
import productsRouter from "./routers/products";
import fileDb from "./fileDb";
import cors from "cors";
import fs = require("fs");
import categoriesRouter from "./routers/categories";
import mongoDb from "./mongoDb";
import * as mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/shop');

    if (fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    })
};

run().catch(err => console.log(err));