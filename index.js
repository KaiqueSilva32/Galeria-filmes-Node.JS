import express from "express";
// Importando o multer
import multer from "multer";

import connection from "./config/sequelize-config.js";

import Galeria from "./models/Galeria.js";

const app = express();

// configurações
app.use(express.static("public"));
app.set("view engine", "ejs");

const upload = multer({ dest: "public/uploads/" });

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

//  Criando o banco de dados se ele não existir
connection
  .query(`CREATE DATABASE IF NOT EXISTS galeria_filmes;`)
  .then(() => {
    console.log("O banco de dados está criado.");
  })
  .catch((error) => {
    console.log(error);
  });

// ROTA DE UPLOAD
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file.filename;
  const nome = req.body.nome;
  const ano = req.body.ano;
  Galeria.create({
    file: file,
    nome:nome,
    ano:ano
  });
  res.redirect("/");
});

app.get("/", (req, res) => {
  Galeria.findAll().then((imagens) => {
    res.render("index", {
      imagens: imagens,
    });
  });
});

const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro! ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}.`);
  }
});
