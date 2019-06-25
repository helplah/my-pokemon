// where should I put db
// require("./db");

const app = require("./app");
const port = 3000;

app.listen(port, () => {
  console.log(`Port ${port} running!`);
});
