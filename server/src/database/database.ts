import { Sequelize } from "sequelize";

const user = process.env.DB_USER || "";
const password = process.env.DB_PASSWORD || "";

export const sequelize = new Sequelize(
    'eletro_master',
    'root',	
    '#Jojoka0723',	
    {
      host: 'localhost',
      dialect: 'mysql',
      timezone: '-03:00',
    },
);