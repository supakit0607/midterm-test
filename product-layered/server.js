const express = require('express');
const app = express();
// ตรวจสอบว่าพาธชี้ไปที่ src/presentation/productController.js ถูกต้อง
const productController = require('./src/presentation/productController');

app.use(express.json());
app.use(express.static('public'));

// Routes สำหรับ API
app.get('/api/products', productController.handleGetProducts);
app.post('/api/products', productController.handlePostProduct);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Layered Server running at http://localhost:${PORT}`);
});