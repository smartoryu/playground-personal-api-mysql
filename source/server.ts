import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { CustomError, logging } from './utils';
// import API_MODULES from './modules';

/** Change directory of .env file */
dotenv.config({ path: path.join(__dirname, '../.env') });

const app: Application = express();
const NAMESPACE = 'SERVER';

/** TODO	Connect to DB */

/** Log the request & response */
app.use((req, res, next) => {
	/** Log the request */
	logging.info(NAMESPACE + '-REQUEST', {
		method: req.method,
		url: req.url,
		ip: req.socket.remoteAddress
	});

	res.on('finish', () => {
		/** Log the response */
		logging.info(NAMESPACE + '-RESPONSE', {
			method: req.method,
			url: req.url,
			status: res.statusCode,
			ip: req.socket.remoteAddress
		});
	});

	next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** TODO Initiate routes */
// const apiModules = new API_MODULES();
// app.use('/api', apiModules.router);
app.use('/', (req, res) => res.send('Your personal API is up and running!'));

/** Error handling */
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
	/** internal logging */
	logging.error(NAMESPACE, { ...err });

	/** adding stack on development enviroment */
	let json: any = { message: err.message, errors: err.errors, error: err.error };
	if (process.env.NODE_ENV === 'development') json.stack = err.stack;
	res.status(err.statusCode || 500).json(json);
});

/** Create server */
const httpServer = http.createServer(app);

/** Listen server */
httpServer.listen(3010, () => {
	logging.info(NAMESPACE, { message: `Server is running on ${'localhost'}:${3010}` });
});

/** Set server timeout */
httpServer.setTimeout(10000);
