import pino from 'pino';
import { dev } from '$app/environment';

// JSON logs on stdout, collected by the container runtime
const logger = pino({
	level: process.env.LOG_LEVEL ?? (dev ? 'debug' : 'info'),
	formatters: {
		level: (label) => ({ level: label })
	}
});

export interface Logger {
	debug: (msg: string, obj?: object) => void;
	info: (msg: string, obj?: object) => void;
	warn: (msg: string, obj?: object) => void;
	error: (msg: string, obj?: object) => void;
}

export const createLogger = (module: string): Logger => ({
	debug: (msg: string, obj = {}) => logger.debug({ module, ...obj }, msg),
	info: (msg: string, obj = {}) => logger.info({ module, ...obj }, msg),
	warn: (msg: string, obj = {}) => logger.warn({ module, ...obj }, msg),
	error: (msg: string, obj = {}) => logger.error({ module, ...obj }, msg)
});
