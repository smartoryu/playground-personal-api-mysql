import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { IController } from '../../../utils';
import { BudgetTrackerService } from './budget_tracker_service';

export class BudgetTrackerController implements IController {
	path = '/budget_trackers';
	router = Router();
	service: BudgetTrackerService;

	private initRouter() {
		this.router.route(this.path).get(this.getAll);
	}

	constructor() {
		this.initRouter();
		this.service = new BudgetTrackerService();
	}

	private getAll = asyncHandler(async (req, res) => {
		const { statusCode, ...result } = await this.service.getAll();
		res.status(statusCode).json(result);
	});
}
