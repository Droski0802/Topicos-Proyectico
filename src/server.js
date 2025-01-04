const app = require("./app"); 

// Especificamos el puerto donde correra la aplicacion
const port = process.env.port || 3000; 

// Iniciamos el servidor
app.listen(port, () => { 
  console.log(`Server running on http://localhost:${port}`); 
}); 

// Conectamos a la base de datos
const connectDB = require("./config/database"); 
connectDB(); 
