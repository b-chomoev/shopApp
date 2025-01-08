import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'shop_db',
    }
}

export default config;