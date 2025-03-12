const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4200'], // Permite peticiones solo desde esta URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

const mysql = require('mysql2'); //estamos usando mysql

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.use(express.json());
const PORT = process.env.PORT || 2700;

app.listen(PORT, () => {
    console.log('api listening on PORT: ' + PORT);
})


//tipos
app.get("/tipos", (request, response) => {
    db.query('SELECT * FROM tipos', (err, results) => {
        if (err) {
            console.error('Error al obtener tipos:', err);
            response.status(500).json({ error: 'Error al obtener tipos' });
        } else {
            response.json({ tipos: results });
        }
    })

});

//productos
app.get("/products/:id", (request, response) => {
    const productId = request.params.id;
    db.query('SELECT * FROM productos WHERE idproductos = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            response.status(500).json({ error: 'Error al obtener productos' });
        } else {
            response.json({ productos: results });
        }
    })
});
app.get("/products", (request, response) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            response.status(500).json({ error: 'Error al obtener productos' });
        } else {
            response.json({ productos: results });
        }
    })

});
app.post("/products", (request, response) => {
    const newProduct = request.body;
    db.query('INSERT INTO productos (idproductos, nombre, descripcion, precio, oferta, descuento, idtipos, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [newProduct.idproductos, newProduct.nombre, newProduct.descripcion, newProduct.precio, newProduct.oferta, newProduct.descuento, newProduct.idtipos, newProduct.imagePath], (err, results) => {
            if (err) {
                console.error('Error al crear el Producto:', err);
                response.status(500).json({ error: 'Error al crear el Producto' });
            } else {
                response.json({ message: 'Producto creado con éxito', producto: newProduct });
            }
        });
});
app.put("/products/:id", (request, response) => {
    const productId = request.params.id;
    const updatedProduct = request.body;
    db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, oferta = ?, descuento = ?, idtipos = ?, imagePath = ? WHERE idproductos = ?', [updatedProduct.nombre, updatedProduct.descripcion, updatedProduct.precio, updatedProduct.oferta, updatedProduct.descuento, updatedProduct.idtipos, updatedProduct.imagePath, productId], (err, results) => {

        if (err) {
            console.error('Error al actualizar el producto:', err);
            response.status(500).json({ error: 'Error al actualizar el producto' });
        } else {
            response.json({ message: 'Producto actualizado con exito', producto: updatedProduct });
        }
    });

});
app.delete("/products/:id", (request, response) => {
    const productId = request.params.id;
    db.query('DELETE from productos WHERE idproductos = ?', [productId], (err, results) => {

        if (err) {
            console.error('Error al borrar el producto:', err);
            response.status(500).json({ error: 'Error al borrar el producto' });
        } else {
            response.json({ message: 'Producto borrado con exito' });
        }
    });

});
//users
app.post("/users", (request, response) => {
    const newUser = request.body;
    db.query('INSERT INTO users (username, email, password, roles_id) VALUES (?, ?, ?, ?)',
        [newUser.username, newUser.email, newUser.password, 2], (err, results) => {
            if (err) {
                console.error('Error al crear el usuario:', err.message);
                response.status(500).json({
                    error: 'Error al crear el usuario',
                    message: err.message

                });
            } else {
                response.json({ message: 'Usuario creado con éxito', user: newUser });
            }
        });
});
app.get("/users", (request, response) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error al obtener users:', err);
            response.status(500).json({ error: 'Error al obtener users' });
        } else {
            response.json({ users: results });
        }
    })

});