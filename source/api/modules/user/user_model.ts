import { DataTypes, Model } from 'sequelize';
import configs from '../../../configs';
import { IUser, IUserInput } from './user_interface';

class UserSchema extends Model<IUser, IUserInput> implements IUser {
	public id!: number;
	public fullname!: string;
	public username!: string;
	public password!: string;
	public code!: string;
	public role!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

UserSchema.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.ENUM,
			allowNull: false,
			values: ['admin', 'guest']
		},
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: DataTypes.NOW,
			allowNull: false
		},
		updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: DataTypes.NOW,
			allowNull: false
		}
	},
	{
		modelName: 'User',
		sequelize: configs.sequelize,
		timestamps: true,
		paranoid: true
	}
);

export default UserSchema;
