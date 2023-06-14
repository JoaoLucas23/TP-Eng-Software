import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/database";
import PecaService from "../../Peca/services/PecaService";
import { Servico } from "../../Servico/models/Servico";
import { Peca } from "../../Peca/models/Peca";

export interface PecaServicoProps {
    id?: number;
    id_peca: number;
    id_servico: number;
    quantidade: number;
}

export interface PecaServicoInstance extends Model<PecaServicoProps>, PecaServicoProps {}

export const PecaServico = sequelize.define<PecaServicoInstance>('PecaServico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_peca: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_servico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false,
});

Servico.hasMany(PecaServico, {foreignKey: 'id_servico', sourceKey: 'id'});
PecaServico.belongsTo(Servico, {foreignKey: 'id_servico', targetKey: 'id'});
PecaServico.belongsTo(Peca, {foreignKey: 'id_peca', targetKey: 'id'});
Peca.hasMany(PecaServico, {foreignKey: 'id_peca', sourceKey: 'id'});

PecaServico.sync({alter:false, force: false})
    .then(() => {
        console.log('Tabela Peca criada');
    }
    ).catch((err) => {
        console.log(err);
    });
