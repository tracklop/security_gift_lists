import { Model, DataTypes } from 'sequelize';

class Gift extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                label: {
                    allowNull: false,
                    type: DataTypes.STRING(30),
                    unique: true,
                },
                current_price: {
                    allowNull: false,
                    type: DataTypes.DECIMAL(10, 2),
                },
                original_price: {
                    allowNull: false,
                    type: DataTypes.DECIMAL(10, 2),
                },
                is_reserved: {
                    allowNull: false,
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
            },
        );
    }

    static associate({ List }) {
        Gift.belongsToMany(List, { through: 'GiftList', as: 'lists' });
    }
}

export default Gift;
