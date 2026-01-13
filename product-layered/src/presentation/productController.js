// ใช้ ../ เพื่อถอยออกจาก presentation ไปยัง src แล้วเข้า business
const productService = require('../Business/productService');

const productController = {
    handleGetProducts: async (req, res) => {
        try {
            const category = req.query.category;
            const result = await productService.getProductsWithStats(category);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    handlePostProduct: async (req, res) => {
        try {
            const result = await productService.createNewProduct(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productController;