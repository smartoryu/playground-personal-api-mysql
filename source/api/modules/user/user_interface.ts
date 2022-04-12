import { Optional } from 'sequelize/types';
import UserSchema from './user_model';

export interface IUser {
	id: number;
	fullname: string;
	username: string;
	password: string;
	code: string;
	role: string;

	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface IUserInput extends Optional<IUser, 'id'> {}

export interface IUserUpdate extends Optional<IUser, 'id'> {}

export interface IUserOuput extends Required<IUser> {}

export const IUserOutputFromSchema = (
	json: UserSchema
): Required<IUser> => ({
	id: json.id,
	fullname: json.fullname,
	username: json.username,
	password: json.password,
	role: json.role,
	code: json.code,
	createdAt: json.createdAt,
	updatedAt: json.updatedAt,
	deletedAt: json.deletedAt
});
