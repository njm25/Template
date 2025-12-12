import { Express } from "express";

export abstract class BaseService {
	protected app: Express;
	protected basePath: string;

	constructor(app: Express) {
		this.app = app;
		this.registerRoutes();
	}

	protected abstract registerRoutes(): void;
}