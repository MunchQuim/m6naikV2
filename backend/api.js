const express = require('express');
const app = express();

const mysql = require('mysql2'); //estamos usando mysql
const PASSWORD = ''; // modificar
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: PASSWORD,
    database: 'mydb',
});



app.use(express.json());
const PORT = process.env.PORT || 2700;

app.listen(PORT, () => {
    console.log('api listening on PORT: ' + PORT);
})

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

app.get("/products/:id", (request, response) => {
    const productId = request.params.id;
    db.query('SELECT * FROM productos WHERE idproductos = ?',[productId], (err, results) => {
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
    db.query('DELETE from productos WHERE idproducto = ?',[productId], (err, results) => {

        if (err) {
            console.error('Error al borrar el producto:', err);
            response.status(500).json({ error: 'Error al borrar el producto' });
        } else {
            response.json({ message: 'Producto borrado con exito' });
        }
    });

});