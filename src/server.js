const app = require("./app");

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const connectDB = require("./config/database");

connectDB();
