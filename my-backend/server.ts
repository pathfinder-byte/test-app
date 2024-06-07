import Server from "./src/index";
const server = Server();
const port = process.env.PORT || 3005;
server.listen(port, () => {
  console.log("Server is running on port 3005");
});
