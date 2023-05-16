import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database";

export interface ClienteProps {
    id: number;
    nome: string;
    data_nascimento: Date;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
}

export const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:  {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
});

Cliente.sync({alter:false, force: false})
    .then(() => {
        console.log('Tabela Cliente criada');
    }
    ).catch((err) => {
        console.log(err);
    });