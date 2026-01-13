const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// เชื่อมต่อ Database (จะสร้างไฟล์ products.db ให้อัตโนมัติ)
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, stock INTEGER, category TEXT)");
});

// API สำหรับดึงข้อมูลสินค้าทั้งหมด
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    let sql = "SELECT * FROM products";
    let params = [];
    if (category) {
        sql += " WHERE category = ?";
        params.push(category);
    }
    db.all(sql, params, (err, rows) => {
        const totalValue = rows.reduce((sum, p) => sum + (p.price * p.stock), 0);
        res.json({ products: rows, totalValue });
    });
});

// API สำหรับเพิ่มสินค้า
app.post('/api/products', (req, res) => {
    const { name, price, stock, category } = req.body;
    db.run("INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)", 
    [name, price, stock, category], function(err) {
        res.json({ id: this.lastID });
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));