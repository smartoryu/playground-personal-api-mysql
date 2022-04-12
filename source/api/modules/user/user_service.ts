import { Op, where } from 'sequelize';
import {
	ConflictError,
	CustomError,
	IReturnService,
	logging,
	NotFoundError,
	ValidationError
} from '../../../utils';
import {
	IUserInput,
	IUserOuput,
	IUserOutputFromSchema
} from './user_interface';
import UserSchema from './user_model';

interface IUserService {
	create: (
		payload: IUserInput
	) => Promise<IReturnService<IUserOuput>>;
	getAll: () => Promise<IReturnService<IUserOuput[]>>;
	getById: (id: string) => Promise<IReturnService<IUserOuput>>;
	updateById: (
		id: string,
		payload: IUserInput
	) => Promise<IReturnService<IUserOuput>>;
	deleteById: (id: string) => Promise<IReturnService<IUserOuput>>;
}

const NAMESPACE = 'User';

export class UserService implements IUserService {
	async create(payload: IUserInput) {
		try {
			const lastUser = await UserSchema.findOne({
				where: { code: { [Op.ne]: null } },
				order: [['createdAt', 'DESC']],
				attributes: ['code']
			});

			let userType = payload.role === 'admin' ? 'ADM' : 'GST';
			let userCount: string;
			if (lastUser !== null) {
				const codeNum = lastUser.code.split('-')[1];
				const newCodeNum = parseInt(codeNum) + 1;
				userCount = newCodeNum.toString().padStart(3, '0');
			} else {
				userCount = '001';
			}

			payload.code = `${userType}-${userCount}`;

			const res = await UserSchema.create(payload);
			return {
				statusCode: 200,
				message: `${NAMESPACE} created successfully`,
				result: IUserOutputFromSchema(res)
			};
		} catch (err: any) {
			logging.error('ERROR CREATE', err?.errors ?? err);
			if (err?.name === 'SequelizeUniqueConstraintError') {
				throw new CustomError('Username already registered');
			} else if (err?.name === 'SequelizeValidationError') {
				throw new ValidationError(err?.errors);
			} else {
				throw new CustomError('Something went wrong');
			}
		}
	}

	getAll = async () =>
		new Promise<IReturnService<IUserOuput[]>>((resolve, reject) =>
			UserSchema.findAndCountAll()
				.then(({ count, rows: result }) =>
					resolve({
						statusCode: 200,
						message: `${NAMESPACE}s retrieved successfully`,
						count,
						result: result.map((e) => IUserOutputFromSchema(e))
					})
				)
				.catch(reject)
		);

	getById = async (id: string) =>
		new Promise<IReturnService<IUserOuput>>((resolve, reject) =>
			UserSchema.findByPk(id)
				.then((result) => {
					if (result) {
						resolve({
							message: `${NAMESPACE} retrieved successfully`,
							statusCode: 200,
							result: IUserOutputFromSchema(result)
						});
					} else {
						resolve({
							message: `${NAMESPACE} not found`,
							statusCode: 404
						});
					}
				})
				.catch(reject)
		);

	async updateById(id: string, payload: IUserInput) {
		const res = await UserSchema.findByPk(id);
		if (!res) throw new NotFoundError(`User ID ${id}`);

		await res.update(payload, { where: { id } });
		return {
			statusCode: 200,
			message: `${NAMESPACE} ${id} deleted successfully`,
			result: IUserOutputFromSchema(res)
		};
	}

	async deleteById(id: string) {
		const res = await UserSchema.findByPk(id);
		if (!res) throw new NotFoundError(`User ID ${id}`);

		let username = res.username + '_deleted_' + Date.now();
		console.log('USERNAME', id, username);
		await res.update({ username }, { where: { id } });
		await res.destroy();
		return {
			statusCode: 200,
			message: `${NAMESPACE} ${id} deleted successfully`,
			result: IUserOutputFromSchema(res)
		};
	}
}
