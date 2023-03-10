const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

const app = require("./app");
const port = 8000 || process.env.PORT;
const server = app.listen(port, () => {});
