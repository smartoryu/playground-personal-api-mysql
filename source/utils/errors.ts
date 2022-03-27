interface ICustomError {
	statusCode?: number;
	error?: any;
	errors?: any;
}

export class CustomError extends Error {
	error?: any;
	errors?: any;
	statusCode: number;

	constructor(message: string, { statusCode, error, errors }: ICustomError = {}) {
		super(message || 'Something went wrong');

		this.name = this.constructor.name;
		this.errors = errors;
		this.error = error;
		this.statusCode = statusCode || 500;
	}
}

export class ValidationError extends CustomError {
	constructor(errors?: any) {
		super('Validation Error', { statusCode: 403 });

		this.getErrors(errors);
	}

	private getErrors(v?: any) {
		let obj: any = {};
		for (let k in v) obj[k] = v[k].message;
		this.errors = obj;
	}
}

export class NotFoundError extends CustomError {
	constructor(namespace: string, error?: string) {
		super(`${namespace} Not Found`, { statusCode: 404, error });
	}
}

export class ConflictError extends CustomError {
	constructor(message?: string, error?: string) {
		super(message || 'Conflict', { statusCode: 409, error });
	}
}
