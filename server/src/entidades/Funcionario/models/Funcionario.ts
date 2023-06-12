import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/database";

export interface FuncionarioProps {
    id?: number;
    nome: string;
    data_nascimento: string;
    foto: string;
    cargo: string;
    matricula: string;
    disponivel?: boolean;
}

export interface FuncionarioInstance extends Model<FuncionarioProps>, FuncionarioProps {}

export const Funcionario = sequelize.define<FuncionarioInstance>('Funcionario', {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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