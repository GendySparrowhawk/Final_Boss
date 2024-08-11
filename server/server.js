const express = require("express");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apllo/server/express4");
const { graphqlUploadExpress } = require("graphql-upload");

const app = express();

const PORT = process.env.PORT || 3333;
const is_prod = process.env.NODE_ENV === "production";
const path = require("path");

require("dotenv").config();

const db = require("./config/connection");

const { typeDefs, resolvers } = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(express.json());

  if (is_prod) {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  }

  app.use(express.static("public"));

  app.use(
    "/graphql",
    graphqlUploadExpress({
      maxFileSize: 10 * 100 * 1000,
    }),
    expressMiddleware(server, {
      context: authenticate,
    })
  );

  if (is_prod) {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    console.log("Databse connected");

    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
      console.log("GrpahQL readt at /graphql");
    });
  });
}
startServer();
