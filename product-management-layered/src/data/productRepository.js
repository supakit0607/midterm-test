const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, stock INTEGER, category TEXT)");
});

const productRepository = {
    getAll: (category) => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM products";
            let params = [];
            if (category) {
                sql += " WHERE category = ?";
                params.push(category);
            }
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },
    add: (product) => {
        return new Promise((resolve, reject) => {
            const { name, price, stock, category } = product;
            db.run("INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)",
                [name, price, stock, category], function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID });
                });
        });
    }
};

module.exports = productRepository;