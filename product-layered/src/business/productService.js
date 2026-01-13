const productRepository = require('../data/productRepository');

const productService = {
    getProductsWithStats: async (category) => {
        const products = await productRepository.getAll(category);
        // คำนวณราคารวม (Business Logic)
        const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
        return { products, totalValue };
    },
    createNewProduct: async (productData) => {
        return await productRepository.add(productData);
    }
};

module.exports = productService;