import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/database";
import { Cliente } from "../../Cliente/models/Cliente";
import { Funcionario } from "../../Funcionario/models/Funcionario";
import { Orcamento } from "../../Orcamento/models/Orcamento";

export interface ServicoProps {
    id?: number;
    id_funcionario?: number;
    id_orcamento?: number;
    status: string;
}

export interface ServicoInstance extends Model<ServicoProps>, ServicoProps {}

export const Servico = sequelize.define<ServicoInstance>('Servico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_orcamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Aguardando início','Em andamento','Concluído']
    }
},
{
    timestamps: false,
});

Funcionario.hasOne(Servico, {foreignKey: 'id_funcionario', sourceKey: 'id'})
Servico.belongsTo(Funcionario, {foreignKey: 'id_funcionario', targetKey: 'id'})
Servico.belongsTo(Orcamento, {foreignKey: 'id_orcamento', targetKey: 'id'})

Servico.sync({alter:false, force: false})
    .then(() => {
        console.log('Tabela Servico criada');
    }
    ).catch((err) => {
        console.log(err);
    });