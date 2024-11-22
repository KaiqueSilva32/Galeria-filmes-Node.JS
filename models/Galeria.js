import sequelize, { Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";

const imagem = connection.define("imagens", {
  file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome: {
    type:Sequelize.STRING,
    allowNull:false
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

imagem.sync({force: false});
export default imagem;
