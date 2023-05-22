import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/database";

export interface PecaProps {
    id?: number;
    nome: string;
    categoria: string;
    tamanho: number; 
    peso: number; 
    fabricante: string;
    quantidade_disponivel?: number;
    preco: number;
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
    categoria: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['']
    },
    tamanho: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    peso: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade_disponivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    preco: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0.0
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