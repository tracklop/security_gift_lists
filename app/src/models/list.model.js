import { Model, DataTypes } from 'sequelize';

class List extends Model {
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
                is_archived: {
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

    static associate({ Gift }) {
        List.belongsToMany(Gift, { through: 'GiftList', as: 'gifts' });
    }
}

export default List;
