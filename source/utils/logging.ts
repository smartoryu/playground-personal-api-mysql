import colors from 'colors';

type TLog = 'info' | 'warn' | 'error' | 'debug';

interface ILogger {
	message: string | Record<string, unknown>;
	namespace: string;
	type: TLog;
}

const getTimeStamp = (): string => new Date().toISOString();

const getColor = (logType: TLog): colors.Color => {
	switch (logType) {
		case 'error':
			return colors.red;
		case 'warn':
			return colors.yellow;
		case 'debug':
			return colors.inverse;

		case 'info':
		default:
			return colors.white;
	}
};

const logger = ({ message, namespace, type: logType }: ILogger) => {
	let color = getColor(logType);
	let type = logType.toUpperCase();
	let time = getTimeStamp();
	let msg: string = `[${type}] - [${time}] - [${namespace}]`;
	console.log(`\n------------------------------------------------------`);
	console.log('|', color(msg), '\n');
	console.log(message);
	console.log(`------------------------------------------------------`);
};

const info = (namespace: string, message: string | Record<string, unknown>) => {
	logger({ message, namespace, type: 'info' });
};

const warn = (namespace: string, message: Record<string, unknown>) => {
	logger({ message, namespace, type: 'warn' });
};

const error = (namespace: string, message: Record<string, unknown>) => {
	logger({ message, namespace, type: 'error' });
};

const debug = (namespace: string, message: Record<string, unknown>) => {
	logger({ message, namespace, type: 'debug' });
};

export const logging = {
	info,
	warn,
	error,
	debug
};
