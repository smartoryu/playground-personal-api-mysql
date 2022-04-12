import { Router } from 'express';

export interface IController {
	path: String;
	router: Router;
}

export interface IReturnService<T> {
	statusCode: number;
	message: string;
	count?: number;
	result?: T;
	error?: any;
}

export interface ICronJob {
	time: string;
	action: () => void | Promise<void>;
}
