import { DataTypes, Model, Sequelize } from 'sequelize';

interface PagamentoAttributes {
    id?: string;
    valorTotal: number;
    statusPagamento: string;
}

export class Pagamento extends Model<PagamentoAttributes> implements PagamentoAttributes {
    id!: string;
    valorTotal!: number;
    statusPagamento!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initPagamentoModel = (sequelize: Sequelize) => {
    Pagamento.init(
        {
            id: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },
            valorTotal: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            statusPagamento: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Pagamento',
            tableName: 'pagamentos',
            timestamps: true,
        }
    );
};
