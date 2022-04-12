import { Router } from 'express';
import cron from 'node-cron';
import { IController, ICronJob } from '../utils';
import { BudgetTrackerController } from './modules/budget_tracker/budget_tracker_controller';
import { UserController } from './modules/user/user_controller';

interface IApiModules {
	path: String;
	router: Router;
	controllers: IController[];
	crons: ICronJob[];
}

export default class API_MODULES implements IApiModules {
	path = '/';
	router = Router();
	controllers = [
		new UserController(),
		new BudgetTrackerController()
		//
	];
	crons = [];

	constructor() {
		this.initController();
		this.initCrons();
	}

	private initController = () => {
		this.controllers.forEach((controller) => {
			this.router.use(this.path, controller.router);
		});
	};

	private initCrons = () => {
		this.crons.forEach(({ time, action }) => {
			cron.schedule(time, action, { timezone: 'Asia/Jakarta' });
		});
	};
}
