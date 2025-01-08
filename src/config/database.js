const mongoose = require("mongoose"); 

// Funcion para conectar a la BD
const connectDB = async () => { 
  mongoose 
    .connect("mongodb://127.0.0.1:27017/jokes") 
    .then(() => console.log("Conectado a MongoDB")) 
    .catch((err) => console.error("Error al conectar a MongoDB:", err)); 
}; 

// Exportamos la conexion a la BD
module.exports = connectDB; 
