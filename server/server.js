const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const exphbs = require("express-handlebars");
// const { graphqlUploadExpress } = require('graphql-upload');
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3333;
const is_prod = process.env.NODE_ENV === "production";

const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  console.log("Views directory:", path.join(__dirname, "../views"));
console.log("Public directory:", path.join(__dirname, "../public"));


  const hbs = exphbs.create({});
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "../views"));

  app.use(express.static(path.join(__dirname, "../public")));

  app.use(express.json());

  app.use(express.static("./public"));

  app.use("/graphql", expressMiddleware(server));
  app.get("/", (req, res) => {
    res.render("index");
  });

  db.once("open", () => {
    console.log("final Boss bossing");

    app.listen(PORT, () => {
      console.log("Server started on port: ", PORT);
      console.log("GrahQL ready");
    });
  });
}
startServer();
