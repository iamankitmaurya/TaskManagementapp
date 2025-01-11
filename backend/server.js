require("dotenv").config();
require("colors");
const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");

const port = process.env.PORT; // Fallback to 4000 if undefined
ConnectDB();

app.listen(port, () => {
  console.log(`> the app is listening at http://localhost:${port}`.bgGreen);
});
