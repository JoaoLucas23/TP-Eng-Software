import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/database";

export interface PecaProps {
    id?: number;
    nome: string;
    tipo: string;
    quantidade: number;
}

export interface PecaInstance extends Model<PecaProps>, PecaProps {}

export const Peca = sequelize.define<PecaInstance>('Peca', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
{
    timestamps: false,
});

Peca.sync({alter:true, force: false})
    .then(() => {
        console.log('Tabela Peca criada');
    }
    ).catch((err) => {
        console.log(err);
    });