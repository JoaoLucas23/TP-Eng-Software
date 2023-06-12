
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'eletro_master',
    'root',	
    '#Jojoka07',
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      timezone: '-03:00',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
    },
);