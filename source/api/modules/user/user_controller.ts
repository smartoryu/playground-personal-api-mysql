import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { IController } from '../../../utils';
import { UserService } from './user_service';

export class UserController implements IController {
	path = '/users';
	router = Router();
	service: UserService;

	private initRouter() {
		this.router.route(this.path).post(this.create).get(this.getAll);
		this.router
			.route(this.path + '/:id')
			.get(this.getById)
			.put(this.updateById)
			.delete(this.deleteById);
	}

	constructor() {
		this.initRouter();
		this.service = new UserService();
	}

	private create = asyncHandler(async (req, res) => {
		let create = this.service.create;
		const { statusCode, ...result } = await create(req.body);
		res.status(statusCode).json(result);
	});

	private getAll = asyncHandler(async (req, res) => {
		const { statusCode, ...result } = await this.service.getAll();
		res.status(statusCode).json(result);
	});

	private getById = asyncHandler(async (req, res) => {
		let getById = this.service.getById;
		const { statusCode, ...result } = await getById(req.params.id);
		res.status(statusCode).json(result);
	});

	private updateById = asyncHandler(async (req, res) => {
		let updateById = this.service.updateById;
		const { statusCode, ...result } = await updateById(
			req.params.id,
			req.body
		);
		res.status(statusCode).json(result);
	});

	private deleteById = asyncHandler(async (req, res) => {
		let deleteById = this.service.deleteById;
		const { statusCode, ...result } = await deleteById(req.params.id);
		res.status(statusCode).json(result);
	});
}
