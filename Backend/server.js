const app = require("./src/app");

const server = app.listen(3001, () => {
  console.log("Express running → PORT 3001");
});

process.on("SIGINT", () => {
  console.log("Bye bye!");
  server.close();
  process.exit();
});
