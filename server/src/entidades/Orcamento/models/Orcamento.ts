import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/database";
import { Cliente } from "../../Cliente/models/Cliente";

export interface OrcamentoProps {
    id?: number;
    valor: number;
    dataInicio: Date;
    dataFim: Date;
    tipoServico: string;
    descricao: string;
    id_cliente?: number;
    aprovado?: boolean;
}

export interface OrcamentoInstance extends Model<OrcamentoProps>, OrcamentoProps {}

export const Orcamento = sequelize.define<OrcamentoInstance>('Orcamento', {
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
    aprovado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
});

Cliente.hasMany(Orcamento, {foreignKey: 'id_cliente', sourceKey: 'id'})
Orcamento.belongsTo(Cliente, {foreignKey: 'id_cliente', targetKey: 'id'})

Orcamento.sync({alter:true, force: false})
    .then(() => {
        console.log('Tabela Orcamento criada');
    }
    ).catch((err) => {
        console.log(err);
    });