const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('uploads')); // Para servir imágenes subidas

// Configuración de Multer para almacenar imágenes con el nombre enviado por el frontend
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Ya viene con el nombre personalizado del frontend
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('imagen'), (req, res) => {
  res.json({ message: 'Imagen subida con éxito', filePath: `/uploads/${req.file.filename}` });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
