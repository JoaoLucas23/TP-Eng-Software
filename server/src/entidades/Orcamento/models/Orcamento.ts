import { DataTypes } from "sequelize";
import { sequelize } from "../../../database/database";

export interface OrcamentoProps {
    id: number;
    valor: number;
    dataInicio: Date;
    dataFim: Date;
    tipoServico: string;
    descricao: string;
    idCliente: number;
    idFuncionario: number;
}

export const Orcamento = sequelize.define('Orcamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipoServico: {
        type: DataTypes.ENUM,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    timestamps: false,
});

Orcamento.sync({alter:false, force: false})
    .then(() => {
        console.log('Tabela Orcamento criada');
    }
    ).catch((err) => {
        console.log(err);
    });