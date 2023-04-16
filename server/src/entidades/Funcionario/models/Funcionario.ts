import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database";

export interface FuncionarioProps {
    id: number;
    nome: string;
    data_nascimento: Date;
    foto: string;
    cargo: number;
    matricula: string;
}

export const Funcionario = sequelize.define('Funcionario', {
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
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
});

Funcionario.sync({alter:false, force: false})
    .then(() => {
        console.log('Tabela Funcionario criada');
    }
    ).catch((err) => {
        console.log(err);
    });