import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import { CustomError, IReturnService, logging } from '../../../utils';

dotenv.config();

const NAMESPACE = 'BudgetTracker';

const notion = new Client({
	auth: process.env.NOTION_API_KEY ?? ""
});

interface IBudgetTrackerService {
	getAll: () => Promise<IReturnService<any>>;
}

export class BudgetTrackerService implements IBudgetTrackerService {
	async getAll() {
		try {
			const res = await notion.databases.query({
				database_id: process.env.NOTION_DATABASE_ID || ''
			});

			return {
				statusCode: 200,
				message: `${NAMESPACE} created successfully`,
				result: res
			};
		} catch (err: any) {
			logging.error('ERROR GET ALL', err?.errors ?? err);
			throw new CustomError('Something went wrong');
		}
	}
}
