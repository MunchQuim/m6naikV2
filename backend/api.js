const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const MINUTES = 2;
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4200'], // Permite peticiones solo desde esta URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
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
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            response.status(500).json({ error: 'Error al obtener productos' });
        } else {
            response.json({ productos: results });
        }
    })
});
app.get("/products", (request, response) => {
    db.query('SELECT * FROM products', (err, results) => {
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
    db.query('INSERT INTO products (id, name, description, price, onSale, discount, productTypes_id, imageUrl, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [newProduct.id, newProduct.name, newProduct.description, newProduct.price, newProduct.onSale, newProduct.discount, newProduct.productTypes_id, newProduct.imageUrl, newProduct.stock], (err, results) => {
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
    db.query('UPDATE products SET name = ?, description = ?, price = ?, onSale = ?, discount = ?, productTypes_id = ?, imageUrl = ?, stock = ? WHERE id = ?', [updatedProduct.name, updatedProduct.description, updatedProduct.price, updatedProduct.onSale, updatedProduct.discout, updatedProduct.productTypes_id, updatedProduct.imageUrl, updatedProduct.stock, productId], (err, results) => {

        if (err) {
            console.error('Error al actualizar el producto:', err);
            response.status(500).json({ error: 'Error al actualizar el producto' });
        } else {
            response.json({ message: 'Producto actualizado con exito', producto: updatedProduct });
        }
    });

});

app.patch("/products/:id", (request, response) => {
    const productId = request.params.id;
    const { stock } = request.body;
    db.query('UPDATE products SET stock = ? WHERE id = ?', [stock, productId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el stock del producto:', err);
            response.status(500).json({ error: 'Error al actualizar el stock' });
        } else {
            response.json({ message: 'Stock actualizado con éxito' });
        }
    });
});

app.delete("/products/:id", (request, response) => {
    const productId = request.params.id;
    db.query('DELETE from products WHERE id = ?', [productId], (err) => {

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
        [newUser.username, newUser.email, newUser.password, 2],
        (err, results) => {
            if (err) {
                console.error('Error al crear el usuario:', err.message);
                return response.status(500).json({
                    error: 'Error al crear el usuario',
                    message: err.message
                });
            }

            const userId = results.insertId;
            console.log("Usuario creado con ID:", userId);


        }
    );
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

app.get("/users/:id", (request, response) => {
    const userId = request.params.id;
    db.query('SELECT * FROM users where id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario')
            response.status(500).json({
                error: 'Error al obtener el usuario'
            })
        } else {
            response.json({
                user: results
            });
        }
    })
})

app.put("/users/:id", (request, response) => {
    const userId = request.params.id;
    db.query('UPDATE users SET username = ?, email = ?, password = ? where id = ?', [request.username, request.email, request.password, userId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario')
            response.status(500).json({
                error: "Error al obtener el usuario"
            })
        } else {
            response.json({
                user: results
            })
        }
    })
})

app.delete("/users/:id", (request, response) => {
    const userId = request.params.id;
    db.query('DELETE from users where id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al borrar el usuario')
            response.status(500).json({
                error: "error al borrar el usuario"
            })
        } else {
            response.json({ message: 'Usuario borrado con exito' });
        }
    })
})
// carrito

// Insertar el carrito para el usuario recién creado
app.post("/carts",(request,response)=>{
    const body = request.body;
    const now = new Date();
    now.setMinutes(now.getMinutes() + MINUTES);  
    const validUntil = now.toISOString().slice(0, 19).replace('T', ' ');
    db.query(
        'INSERT INTO carts (users_id,validUntil) VALUES (?,?)',
        [body.users_id,validUntil],
        (err, results) => {
            if (err) {
                console.error('Error al crear el carrito:', err);
                return response.status(500).json({
                    error: 'Error al crear el carrito'
                });
            }

            response.json({
                message: 'carrito creado con éxito',
                cart: results,
            });
        }
    );
})

app.get("/carts/:id", (request, response) => {
    const cartId = request.params.id;
    db.query('SELECT * from carts where id = ?', [cartId], (err, results) => {
        if (err) {
            console.error('Error al obtener el carrito:', err);
            response.status(500).json({ error: 'Error al obtener el carrito' });
        } else {
            response.json({ carrito: results });
        }
    })
});
app.get("/userCart/:id", (request, response) => {
    const userId = request.params.id;
    db.query('SELECT * from carts where users_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el carrito:', err);
            response.status(500).json({ error: 'Error al obtener el carrito' });
        } else {
            response.json({ carrito: results });
        }
    })
});

app.get("/carts",(request,response)=>{
    db.query('Select * from carts',(err,results)=>{
        if(err){
            console.error('Errpr al obtener los carritos');
            response.status(500).json({
                error: 'Error al obtener los carritos'
            })
        }else{
            response.json({
                carritos:results
            })
        }
    })
})

app.delete("/users/:id", (request, response) => {
    const cartId = request.params.id;
    db.query('DELETE from carts where id = ?', [cartId], (err, results) => {
        if (err) {
            console.error('Error al borrar el carrito')
            response.status(500).json({
                error: "error al borrar el carrito"
            })
        } else {
            response.json({ message: 'carrito borrado con exito' });
        }
    })
})
app.patch('/cart/:id', async (req, res) => {
    const cartId = req.params.id;
    const now = new Date();
    now.setMinutes(now.getMinutes() + MINUTES);  
    const newValidUntil = now.toISOString().slice(0, 19).replace('T', ' ');
    db.query('UPDATE carts SET validUntil = ? WHERE id = ?',
        [newValidUntil, cartId], (err, results) => {
            if (err) {
                console.error('Error al actualizar el carrito:', err);
                res.status(500).json({ error: 'Error al actualizar el carrito' });
            } else if (results.affectedRows > 0) {
                res.json({ message: 'Carrito actualizado correctamente', validUntil: newValidUntil });
            } else {
                res.status(404).json({ message: 'Carrito no encontrado' });
            }
        });

})


// productos de carrito
app.post("/cartProducts", (request, response) => { //aqui
    const newCarritoProduct = request.body;
    db.query('SELECT quantity FROM cart_has_products WHERE cart_id = ? AND products_id = ?',
        [newCarritoProduct.cart_id, newCarritoProduct.products_id],
        (err, results) => {
            if (err) {
                console.error('Error al verificar el producto en el carrito:', err);
                return response.status(500).json({ error: 'Error al verificar el producto' });
            }

            if (results.length > 0) {
                // Si el producto ya existe en el carrito, sumamos la cantidad
                const newQuantity = results[0].quantity + newCarritoProduct.quantity;
                db.query('UPDATE cart_has_products SET quantity = ? WHERE cart_id = ? AND products_id = ?',
                    [newQuantity, newCarritoProduct.cart_id, newCarritoProduct.products_id],
                    (err) => {
                        if (err) {
                            console.error('Error al actualizar la cantidad:', err);
                            return response.status(500).json({ error: 'Error al actualizar la cantidad' });
                        }
                        response.json({ message: 'Cantidad actualizada correctamente', quantity: newQuantity });
                    }
                );
            } else {
                // Si no existe, lo insertamos
                db.query('INSERT INTO cart_has_products (cart_id, products_id, quantity) VALUES (?, ?, ?)',
                    [newCarritoProduct.cart_id, newCarritoProduct.products_id, newCarritoProduct.quantity],
                    (err) => {
                        if (err) {
                            console.error('Error al añadir el producto:', err);
                            return response.status(500).json({ error: 'Error al añadir el producto' });
                        }
                        response.json({ message: 'Producto añadido con éxito', carritoProduct: newCarritoProduct });
                    }
                );
            }
        }
    );
});

app.delete("/cartProducts/:id", (request, response) => {
    const cartProductId = request.params.id;
    db.query('DELETE from cart_has_products WHERE id = ?', [cartProductId], (err, results) => {

        if (err) {
            console.error('Error al borrar el producto:', err);
            response.status(500).json({ error: 'Error al borrar el producto' });
        } else {
            response.json({ message: 'Producto borrado con exito' });
        }
    });

});
app.get("/productCarts/:id",(request,response)=>{
    const user_id = request.params.id;
    db.query('Select chp.id as "id", c.id as "cart_id", p.id as "product_id", p.name, p.price, p.discount, p.imageUrl, chp.quantity, pt.name as "productType" from users u join carts c on c.users_id = u.id join cart_has_products chp on chp.cart_id = c.id join products p on p.id = chp.products_id join productTypes pt on pt.id = p.productTypes_id where u.id = ? ',[user_id],(err,results)=>{
        if(err){
            console.error('Error al obtener los elementos del carrito');
            response.status(500).json({
                error: 'Error al obtener los elementos del carrito'
            })
        }else{
            response.json({
                carrito_products:results
            })
        }
    })
})